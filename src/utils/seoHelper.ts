import { SiteData, DEFAULT_SEO_CONFIG } from '../data/defaultSiteData';
import { Product, Article, Region } from '../types';
import { BreadcrumbItem, FaqItem } from '../types/seo';

/**
 * Remove Vietnamese accents and special characters for pristine SEO slugs
 */
export function cleanSlug(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const BRAND_FAQS: FaqItem[] = [
  {
    question: 'Tinh dầu VSA LAB có nguồn gốc từ đâu và có thực sự nguyên chất 100% không?',
    answer:
      'Toàn bộ sản phẩm của VSA LAB được chắt lọc 100% nguyên chất từ các vùng dược liệu bản địa như Cam Rừng Tây Giang (Quảng Nam), Bưởi Đỏ Quảng Ngãi và Tràm Gió Ninh Bình. Mỗi mẻ chưng cất đều được kiểm định bằng phương pháp sắc ký khí phổ khối (GC-MS) độc lập, cam kết không pha trộn hương liệu tổng hợp hay dung môi hóa học.',
  },
  {
    question: 'Phương pháp chưng cất hơi nước áp suất thấp của VSA LAB có ưu điểm gì?',
    answer:
      'Quy trình chưng cất lôi cuốn hơi nước áp suất thấp khép kín kiểm soát nhiệt độ nghiêm ngặt dưới 100°C. Nhờ đó, các hoạt chất hữu cơ tự nhiên nhạy cảm với nhiệt không bị biến tính hay phân hủy, giữ trọn vẹn dải hương thơm tinh tế và giá trị trị liệu của từng loài thảo mộc.',
  },
  {
    question: 'Làm thế nào để sử dụng tinh dầu VSA LAB an toàn và hiệu quả?',
    answer:
      'Bạn có thể khuếch tán 3-5 giọt vào máy xông phòng khoảng 20-30 phút trước khi ngủ để tạo không gian thư giãn; pha loãng với dầu dẫn thực vật (dầu dừa, jojoba) theo tỷ lệ 1-2% để massage ngoài da; hoặc ngâm chân nước ấm với 2-3 giọt tinh dầu gừng/sả để kích hoạt tuần hoàn khí huyết. Tránh bôi trực tiếp tinh dầu đậm đặc lên niêm mạc mắt và vết thương hở.',
  },
  {
    question: 'VSA LAB hợp tác với bà con đồng bào địa phương như thế nào?',
    answer:
      'VSA LAB đồng hành cùng HTX Cách Mạng Xanh tại xã Tr\'Hy (Tây Giang), hỗ trợ kỹ thuật thu hái thảo dược có trách nhiệm đúng mùa vụ, bao tiêu sản lượng nông sản với giá cao và ổn định, giúp tạo sinh kế bền vững cho bà con đồng bào Cơ Tu đồng thời bảo tồn hệ sinh thái rừng già Trường Sơn.',
  },
  {
    question: 'Tôi có thể mua sản phẩm hoặc nhận tư vấn kỹ thuật ở đâu?',
    answer:
      'Khách hàng có thể liên hệ trực tiếp hotline 0833-15-3388, nhắn tin qua Zalo hoặc Fanpage chính thức của Vườn Tinh Dầu để nhận báo giá chi tiết, chứng nhận kiểm nghiệm GC-MS và hỗ trợ tư vấn sử dụng phù hợp với nhu cầu.',
  },
];

export interface ResolvedMetadata {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogImage: string;
  ogType: 'website' | 'article' | 'product';
  robots: string;
  author: string;
  publisher: string;
  breadcrumbs: BreadcrumbItem[];
}

export function buildPageMetadata(
  pageId: string,
  siteData: SiteData,
  activeItem?: {
    type: 'product' | 'article' | 'region';
    data: Product | Article | Region;
  }
): ResolvedMetadata {
  const seo = siteData.seo || DEFAULT_SEO_CONFIG;
  const baseCanonical = seo.canonicalBase || 'https://vsalab.vn';
  const defaultTitle = seo.defaultTitle || 'VSALAB - Tinh Hoa Thiên Nhiên | Tinh Dầu Thiên Nhiên Nguyên Bản';
  const defaultDesc =
    seo.defaultDescription ||
    'Thương hiệu tinh dầu thiên nhiên cao cấp VSALAB - Tinh Hoa Thiên Nhiên, chắt lọc 100% nguyên chất từ các vùng nguyên liệu đặc trưng Việt Nam.';
  const defaultKeywords =
    seo.defaultKeywords ||
    'tinh dầu thiên nhiên, tinh dầu nguyên chất, tinh dầu vsalab, cam rừng tây giang, chưng cất hơi nước';
  const defaultOgImage =
    seo.defaultOgImage || 'https://vsalab.vn/images/banner/banner-hero-cam-rung-tay-giang.jpg';

  // 1. If an active modal item (Product or Article) is being viewed
  if (activeItem) {
    if (activeItem.type === 'product') {
      const p = activeItem.data as Product;
      return {
        title: `${p.name} (${p.volume}) – Tinh Dầu Nguyên Chất | VSALAB`,
        description: `${p.description.slice(0, 155)}... Nguồn gốc: ${p.origin}. Kiểm định GC-MS tinh khiết.`,
        keywords: `${cleanSlug(p.name).replace(/-/g, ', ')}, ${p.origin}, tinh dầu nguyên chất, vsalab`,
        canonical: `${baseCanonical}/#san-pham-${p.id}`,
        ogImage: p.image?.startsWith('http') ? p.image : `${baseCanonical}${p.image}`,
        ogType: 'product',
        robots: 'index, follow',
        author: seo.author || 'VSA LAB R&D',
        publisher: seo.publisher || 'VSA LAB',
        breadcrumbs: [
          { name: 'Trang chủ', url: baseCanonical },
          { name: 'Sản phẩm tiêu biểu', url: `${baseCanonical}/#products` },
          { name: p.name, url: `${baseCanonical}/#san-pham-${p.id}` },
        ],
      };
    }

    if (activeItem.type === 'article') {
      const a = activeItem.data as Article;
      return {
        title: `${a.title} | VSALAB Kiến Thức`,
        description: a.excerpt || defaultDesc,
        keywords: `${a.category}, kiến thức tinh dầu, ${cleanSlug(a.title).replace(/-/g, ', ')}`,
        canonical: `${baseCanonical}/#tin-tuc-${a.id}`,
        ogImage: a.image?.startsWith('http') ? a.image : `${baseCanonical}${a.image}`,
        ogType: 'article',
        robots: 'index, follow',
        author: a.author || seo.author || 'VSA LAB',
        publisher: seo.publisher || 'VSA LAB',
        breadcrumbs: [
          { name: 'Trang chủ', url: baseCanonical },
          { name: 'Tin tức & Kiến thức', url: `${baseCanonical}/#news` },
          { name: a.title, url: `${baseCanonical}/#tin-tuc-${a.id}` },
        ],
      };
    }
  }

  // 2. Page Specific Config from SEO settings
  const pageConfig = seo.pages?.[pageId];

  const breadcrumbsMap: Record<string, BreadcrumbItem[]> = {
    home: [{ name: 'Trang chủ', url: baseCanonical }],
    about: [
      { name: 'Trang chủ', url: baseCanonical },
      { name: 'Về chúng tôi', url: `${baseCanonical}/#ve-chung-toi` },
    ],
    'vsa-about': [
      { name: 'Trang chủ', url: baseCanonical },
      { name: 'Trung tâm VSA LAB', url: `${baseCanonical}/#ve-vsa-lab` },
    ],
    'tay-giang': [
      { name: 'Trang chủ', url: baseCanonical },
      { name: 'Vùng nguyên liệu', url: `${baseCanonical}/#origins` },
      { name: 'Tây Giang (Quảng Nam)', url: `${baseCanonical}/#tay-giang` },
    ],
    'quang-ngai': [
      { name: 'Trang chủ', url: baseCanonical },
      { name: 'Vùng nguyên liệu', url: `${baseCanonical}/#origins` },
      { name: 'Quảng Ngãi', url: `${baseCanonical}/#quang-ngai` },
    ],
    'quang-binh': [
      { name: 'Trang chủ', url: baseCanonical },
      { name: 'Vùng nguyên liệu', url: `${baseCanonical}/#origins` },
      { name: 'Quảng Bình', url: `${baseCanonical}/#quang-binh` },
    ],
    'ninh-binh': [
      { name: 'Trang chủ', url: baseCanonical },
      { name: 'Vùng nguyên liệu', url: `${baseCanonical}/#origins` },
      { name: 'Ninh Bình – Nơi Thiên Nhiên Kết Tinh Thành Hương', url: `${baseCanonical}/#ninh-binh` },
    ],
    process: [
      { name: 'Trang chủ', url: baseCanonical },
      { name: 'Quy trình sản xuất', url: `${baseCanonical}/#quy-trinh-san-xuat` },
    ],
    journey: [
      { name: 'Trang chủ', url: baseCanonical },
      { name: 'Hành trình thương hiệu', url: `${baseCanonical}/#hanh-trinh-nguyen-ban` },
    ],
    'tay-giang-news': [
      { name: 'Trang chủ', url: baseCanonical },
      { name: 'Tin tức & Nghiên cứu', url: `${baseCanonical}/#news` },
      { name: 'Câu chuyện rừng Tây Giang', url: `${baseCanonical}/#tin-tuc-tay-giang` },
    ],
    'sleep-wellness-news': [
      { name: 'Trang chủ', url: baseCanonical },
      { name: 'Kiến thức tinh dầu', url: `${baseCanonical}/#news` },
      { name: '5 Lợi ích cho giấc ngủ & thư giãn', url: `${baseCanonical}/#5-loi-ich-tinh-dau` },
    ],
    'extraction-tech-news': [
      { name: 'Trang chủ', url: baseCanonical },
      { name: 'Công nghệ sản xuất', url: `${baseCanonical}/#news` },
      { name: 'Công nghệ chiết xuất hơi nước', url: `${baseCanonical}/#cong-nghe-chiet-xuat` },
    ],
  };

  const currentBreadcrumbs = breadcrumbsMap[pageId] || [{ name: 'Trang chủ', url: baseCanonical }];

  return {
    title: pageConfig?.title || defaultTitle,
    description: pageConfig?.description || defaultDesc,
    keywords: pageConfig?.keywords || defaultKeywords,
    canonical: pageConfig?.canonical || `${baseCanonical}/${pageId === 'home' ? '' : `#${pageId}`}`,
    ogImage: pageConfig?.ogImage || defaultOgImage,
    ogType: (pageConfig?.ogType as 'website' | 'article' | 'product') || 'website',
    robots: pageConfig?.robots || (pageConfig?.noindex ? 'noindex, nofollow' : 'index, follow'),
    author: seo.author || 'VSA LAB',
    publisher: seo.publisher || 'VSA LAB',
    breadcrumbs: currentBreadcrumbs,
  };
}

/**
 * Generate rich JSON-LD graph combining Organization, WebSite, LocalBusiness, Breadcrumbs, etc.
 */
export function generateStructuredDataGraph(
  metadata: ResolvedMetadata,
  siteData: SiteData,
  activeItem?: {
    type: 'product' | 'article' | 'region';
    data: Product | Article | Region;
  }
): object {
  const baseCanonical = siteData.seo?.canonicalBase || 'https://vsalab.vn';
  const hotline = siteData.texts.contact.hotline || '0833-15-3388';
  const email = siteData.texts.contact.email || 'info@vuontinhdau.vn';
  const address = siteData.texts.contact.address || 'Số 08, Đường Trung Lương 3, P. Hòa Xuân, Q. Cẩm Lệ, TP. Đà Nẵng';

  const graph: object[] = [
    // 1. Organization
    {
      '@type': 'Organization',
      '@id': `${baseCanonical}/#organization`,
      name: 'VSA LAB - Vườn Tinh Dầu',
      alternateName: 'Trung tâm Khoa học và Chuyển giao Công Nghệ Nông nghiệp VSA',
      url: baseCanonical,
      logo: {
        '@type': 'ImageObject',
        '@id': `${baseCanonical}/#logo`,
        url: `${baseCanonical}/images/logo/vsalab-logo.svg`,
        caption: 'Logo VSA LAB - Tinh Hoa Thiên Nhiên',
      },
      image: `${baseCanonical}/images/banner/banner-hero-cam-rung-tay-giang.jpg`,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+84-833-15-3388',
          contactType: 'customer service',
          areaServed: 'VN',
          availableLanguage: ['Vietnamese', 'English'],
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Số 08, Đường Trung Lương 3, P. Hòa Xuân',
        addressLocality: 'Q. Cẩm Lệ',
        addressRegion: 'TP. Đà Nẵng',
        postalCode: '550000',
        addressCountry: 'VN',
      },
      sameAs: [
        'https://www.facebook.com/share/192hEhEYeV/?mibextid=wwXIfr',
        'https://zalo.me/0833153388',
      ],
    },

    // 2. LocalBusiness
    {
      '@type': 'LocalBusiness',
      '@id': `${baseCanonical}/#localbusiness`,
      name: 'VSA LAB - Vườn Tinh Dầu',
      image: `${baseCanonical}/images/banner/banner-hero-cam-rung-tay-giang.jpg`,
      telephone: hotline,
      email: email,
      priceRange: '150.000₫ - 1.500.000₫',
      currenciesAccepted: 'VND',
      paymentAccepted: 'Cash, Bank Transfer, COD',
      address: {
        '@type': 'PostalAddress',
        streetAddress: address,
        addressLocality: 'Đà Nẵng',
        addressCountry: 'VN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '15.9863',
        longitude: '108.2162',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '18:00',
        },
      ],
    },

    // 3. WebSite with SearchAction
    {
      '@type': 'WebSite',
      '@id': `${baseCanonical}/#website`,
      url: baseCanonical,
      name: 'VSALAB - Tinh Hoa Thiên Nhiên',
      description: metadata.description,
      inLanguage: 'vi-VN',
      publisher: {
        '@id': `${baseCanonical}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseCanonical}/?s={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },

    // 4. WebPage
    {
      '@type': 'WebPage',
      '@id': `${metadata.canonical}#webpage`,
      url: metadata.canonical,
      name: metadata.title,
      description: metadata.description,
      inLanguage: 'vi-VN',
      isPartOf: {
        '@id': `${baseCanonical}/#website`,
      },
      breadcrumb: {
        '@id': `${metadata.canonical}#breadcrumb`,
      },
    },

    // 5. BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': `${metadata.canonical}#breadcrumb`,
      itemListElement: metadata.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },

    // 6. Scientific Research & Distillation Service
    {
      '@type': 'Service',
      '@id': `${baseCanonical}/#service`,
      name: 'Nghiên cứu & Chưng cất tinh dầu thảo mộc bản địa',
      provider: {
        '@id': `${baseCanonical}/#organization`,
      },
      serviceType: 'Chưng cất lôi cuốn hơi nước áp suất thấp khép kín',
      areaServed: 'VN',
      description:
        'Chuyển giao công nghệ chưng cất, kiểm định sắc ký khí GC-MS và phát triển vùng dược liệu bền vững liên kết hợp tác xã.',
    },
  ];

  // 7. If an Article is active
  if (activeItem && activeItem.type === 'article') {
    const a = activeItem.data as Article;
    graph.push({
      '@type': 'Article',
      '@id': `${metadata.canonical}#article`,
      headline: a.title,
      description: a.excerpt,
      image: [a.image?.startsWith('http') ? a.image : `${baseCanonical}${a.image}`],
      datePublished: '2025-03-15T08:00:00+07:00',
      dateModified: new Date().toISOString(),
      author: {
        '@type': 'Person',
        name: a.author || 'Đội ngũ R&D VSA LAB',
      },
      publisher: {
        '@id': `${baseCanonical}/#organization`,
      },
      mainEntityOfPage: metadata.canonical,
      articleSection: a.category,
      inLanguage: 'vi-VN',
    });
  }

  // 8. If a Product is active
  if (activeItem && activeItem.type === 'product') {
    const p = activeItem.data as Product;
    graph.push({
      '@type': 'Product',
      '@id': `${metadata.canonical}#product`,
      name: p.name,
      image: [p.image?.startsWith('http') ? p.image : `${baseCanonical}${p.image}`],
      description: p.description,
      sku: `VSALAB-${cleanSlug(p.name).toUpperCase()}`,
      brand: {
        '@type': 'Brand',
        name: 'VSA LAB',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'VND',
        price: p.price || 280000,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        url: metadata.canonical,
        seller: {
          '@id': `${baseCanonical}/#organization`,
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: p.rating || 5,
        reviewCount: p.reviewsCount || 48,
        bestRating: 5,
        worstRating: 1,
      },
    });
  }

  // 9. FAQPage Schema
  graph.push({
    '@type': 'FAQPage',
    '@id': `${baseCanonical}/#faq`,
    mainEntity: BRAND_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
