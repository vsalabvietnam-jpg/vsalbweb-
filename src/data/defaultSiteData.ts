import { Product, Region, ProcessStep, Article } from '../types';
import { SiteSeoData } from '../types/seo';
import {
  PRODUCTS as DEFAULT_PRODUCTS,
  REGIONS as DEFAULT_REGIONS,
  PROCESS_STEPS as DEFAULT_PROCESS_STEPS,
  ARTICLES as DEFAULT_ARTICLES,
  HERO_IMAGE,
  FARMER_IMAGE,
} from './mockData';

export interface SiteTexts {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaText: string;
    bgImage: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    ctaText: string;
    farmerImage: string;
    quote: string;
  };
  brandStory: {
    eyebrow: string;
    title: string;
    quote: string;
    p1: string;
    p2: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
    bgImage?: string;
  };
  quality: {
    eyebrow: string;
    title: string;
    description: string;
  };
  contact: {
    hotline: string;
    email: string;
    address: string;
    researchUnit: string;
    facilityName: string;
    distributor: string;
  };
}

export interface SiteData {
  texts: SiteTexts;
  products: Product[];
  regions: Region[];
  processSteps: ProcessStep[];
  articles: Article[];
  seo?: SiteSeoData;
}

export const DEFAULT_SEO_CONFIG: SiteSeoData = {
  defaultTitle: 'VSALAB - Tinh Hoa Thiên Nhiên | Tinh Dầu Thiên Nhiên Nguyên Bản',
  titleTemplate: '%s | VSALAB',
  defaultDescription: 'Thương hiệu tinh dầu thiên nhiên cao cấp VSALAB - Tinh Hoa Thiên Nhiên, chắt lọc 100% nguyên chất từ các vùng nguyên liệu đặc trưng Việt Nam.',
  defaultKeywords: 'tinh dầu thiên nhiên, tinh dầu nguyên chất, tinh dầu vsalab, tinh dầu cam rừng tây giang, tinh dầu sả chanh, chưng cất hơi nước, dược liệu việt nam, vườn tinh dầu, tinh dầu bưởi quảng ngãi, tinh dầu tràm gió ninh bình',
  canonicalBase: 'https://vsalab.vn',
  defaultOgImage: 'https://vsalab.vn/images/banner/banner-hero-cam-rung-tay-giang.jpg',
  author: 'Đội ngũ R&D VSA LAB & HTX Cách Mạng Xanh',
  publisher: 'Trung tâm Khoa học và Chuyển giao Công Nghệ Nông nghiệp VSA',
  themeColor: '#2D4B39',
  locale: 'vi_VN',
  facebookAppId: '192hEhEYeV',
  twitterHandle: '@vsalab_vn',
  googleSearchConsoleCode: '',
  googleAnalyticsId: '',
  googleTagManagerId: '',
  bingVerificationCode: '',
  indexNowApiKey: 'vsalab-indexnow-key-2026',
  pages: {
    home: {
      title: 'VSALAB - Tinh Hoa Thiên Nhiên | Tinh Dầu Thiên Nhiên Nguyên Bản',
      description: 'Khám phá thế giới tinh dầu thiên nhiên nguyên chất 100% từ VSA LAB - kết tinh của thổ nhưỡng đại ngàn, tri thức bản địa và khoa học chưng cất hiện đại.',
      keywords: 'tinh dầu thiên nhiên, tinh dầu nguyên chất, vsalab, tinh dầu việt nam, cam rừng tây giang',
      canonical: 'https://vsalab.vn/',
      ogImage: 'https://vsalab.vn/images/banner/banner-hero-cam-rung-tay-giang.jpg',
      ogType: 'website',
      robots: 'index, follow',
    },
    about: {
      title: 'Về Chúng Tôi – Câu Chuyện Khởi Nguồn & Sứ Mệnh | VSALAB',
      description: 'Hành trình từ sự trân quý thiên nhiên đến giá trị bền vững của Vườn Tinh Dầu và Trung tâm Khoa học VSA LAB.',
      canonical: 'https://vsalab.vn/#ve-chung-toi',
      robots: 'index, follow',
    },
    'vsa-about': {
      title: 'Trung Tâm Khoa Học & Chuyển Giao Công Nghệ VSA LAB',
      description: 'Giới thiệu năng lực nghiên cứu, bảo trợ chuyên môn khoa học nông nghiệp và quy trình kiểm định GC-MS nghiêm ngặt của VSA LAB.',
      canonical: 'https://vsalab.vn/#ve-vsa-lab',
      robots: 'index, follow',
    },
    'tay-giang': {
      title: 'Vùng Nguyên Liệu Rừng Tây Giang – Hồn Thiêng Trường Sơn | VSALAB',
      description: 'Vùng dược liệu bản địa Tây Giang (Quảng Nam) ở độ cao 1.200m, nơi sản sinh giống Cam Rừng cổ thụ, Quế Trà My và Sả Rừng độc bản.',
      canonical: 'https://vsalab.vn/#tay-giang',
      robots: 'index, follow',
    },
    'quang-ngai': {
      title: 'Vùng Nguyên Liệu Bưởi Đỏ & Thảo Mộc Quảng Ngãi | VSALAB',
      description: 'Khám phá thổ nhưỡng phù sa trù phú ven sông Trà Bồng, cội nguồn của tinh dầu vỏ bưởi thanh khiết và thảo mộc miền Trung.',
      canonical: 'https://vsalab.vn/#quang-ngai',
      robots: 'index, follow',
    },
    'quang-binh': {
      title: 'Vùng Nguyên Liệu Tràm Gió & Thảo Dược Miền Cố Đô | VSALAB',
      description: 'Vùng đất đá vôi và khí hậu đặc thù tôi luyện nên hàm lượng Cineol vượt trội trong từng giọt tinh dầu tràm gió nguyên bản.',
      canonical: 'https://vsalab.vn/#quang-binh',
      robots: 'index, follow',
    },
    'ninh-binh': {
      title: 'Câu Chuyện Vùng Nguyên Liệu Ninh Bình – Nơi Thiên Nhiên Kết Tinh Thành Hương | VSALAB',
      description: 'Khám phá vùng nguyên liệu núi đá vôi triệu năm và Rừng Quốc Gia Cúc Phương tại Ninh Bình, cội nguồn của tinh dầu nguyên chất đậm dấu ấn bản địa.',
      canonical: 'https://vsalab.vn/#ninh-binh',
      robots: 'index, follow',
      ogImage: 'https://vsalab.vn/ninh-binh.jpg',
    },
    process: {
      title: 'Quy Trình Chưng Cất & Sản Xuất Khép Kín Chuẩn ISO | VSALAB',
      description: 'Tìm hiểu quy trình từ khâu tuyển chọn nguyên liệu, chưng cất lôi cuốn hơi nước áp suất thấp đến kiểm định sắc ký khí phổ khối GC-MS.',
      canonical: 'https://vsalab.vn/#quy-trinh-san-xuat',
      robots: 'index, follow',
    },
    journey: {
      title: 'Hành Trình Nguyên Bản – Từ Cây Cỏ Đại Ngàn Đến Giọt Tinh Dầu | VSALAB',
      description: 'Mỗi miền đất, một sứ mệnh gìn giữ màu xanh và tôn vinh tri thức đồng bào bản địa của VSA LAB.',
      canonical: 'https://vsalab.vn/#hanh-trinh-nguyen-ban',
      robots: 'index, follow',
    },
    'tay-giang-news': {
      title: 'Câu Chuyện Rừng Nguyên Liệu Tây Giang – Hồn Thiêng Đại Ngàn Quảng Nam',
      description: 'Bài viết chuyên sâu về hệ sinh thái rừng già Tây Giang, đồng bào Cơ Tu gìn giữ thảo dược và công nghệ chưng cất hiện đại VSA LAB.',
      canonical: 'https://vsalab.vn/#tin-tuc-tay-giang',
      ogType: 'article',
      robots: 'index, follow',
    },
    'sleep-wellness-news': {
      title: '5 Lợi Ích Tuyệt Vời Của Tinh Dầu Nguyên Chất Đối Với Giấc Ngủ & Thư Giãn',
      description: 'Khám phá cơ chế tác động của phân tử hương thơm lên hệ viền (Limbic System) giúp xoa dịu thần kinh và cải thiện giấc ngủ sâu.',
      canonical: 'https://vsalab.vn/#5-loi-ich-tinh-dau',
      ogType: 'article',
      robots: 'index, follow',
    },
    'extraction-tech-news': {
      title: 'Công Nghệ Chiết Xuất Hơi Nước: Nghệ Thuật Lưu Giữ Trọn Vẹn Linh Hồn Thảo Mộc',
      description: 'Nguyên lý chưng cất hơi nước áp suất thấp khép kín, phân tách tinh dầu và nước cất Hydrosol không sử dụng dung môi hóa học.',
      canonical: 'https://vsalab.vn/#cong-nghe-chiet-xuat',
      ogType: 'article',
      robots: 'index, follow',
    },
  },
  redirects: [
    { from: '/home', to: '/', code: 301 },
    { from: '/trang-chu', to: '/', code: 301 },
    { from: '/san-pham', to: '/#products', code: 301 },
    { from: '/tin-tuc', to: '/#news', code: 301 },
  ],
};

export const DEFAULT_SITE_DATA: SiteData = {
  texts: {
    hero: {
      eyebrow: 'Thương hiệu tinh dầu Việt',
      title: 'Tinh hoa từ\nvùng đất Việt',
      subtitle:
        'Chúng tôi mang đến những giọt tinh dầu nguyên chất được chắt lọc từ thiên nhiên, từ những vùng nguyên liệu đặc trưng của Việt Nam – kết tinh của đất, trời và con người.',
      ctaText: 'Khám phá câu chuyện của chúng tôi',
      bgImage: HERO_IMAGE,
    },
    about: {
      eyebrow: 'Về chúng tôi • VSA LAB',
      title: 'Từ sự trân quý thiên nhiên\nđến giá trị bền vững',
      description:
        'Vườn Tinh Dầu được đồng hành và bảo trợ chuyên môn bởi Trung tâm Khoa học và Chuyển giao Công Nghệ Nông nghiệp VSA (Chi nhánh Ville De Faifo Việt Nam). Chúng tôi kết nối tri thức bản địa cùng công nghệ chiết xuất hiện đại tại HTX Cách Mạng Xanh (Tây Giang), bảo tồn rừng già và mang những giọt tinh dầu 100% nguyên chất đến mọi gia đình.',
      ctaText: 'Tìm hiểu thêm',
      farmerImage: FARMER_IMAGE,
      quote: 'Từ những người nông dân\nđến những giọt tinh dầu\nthượng hạng',
    },
    brandStory: {
      eyebrow: 'Câu chuyện thương hiệu',
      title: 'Hành trình gìn giữ hương thơm bản địa',
      quote:
        'Chúng tôi tin rằng, mỗi giọt tinh dầu là một câu chuyện về vùng đất, về những con người cần mẫn và tình yêu vô điều kiện với thiên nhiên.',
      p1: 'Khởi nguồn từ những chuyến điền dã đến vùng cao nguyên Tây Giang đại ngàn Trường Sơn, chúng tôi bắt gặp những cánh rừng cam cổ thụ bạt ngàn trong sương sớm. Nhận thấy giá trị dược liệu vô giá nhưng người dân bản địa gặp khó khăn trong đầu ra, Vườn Tinh Dầu phối hợp cùng Trung tâm VSA và HTX Cách Mạng Xanh ra đời để chuyển giao công nghệ chưng cất khép kín, nâng tầm dược liệu quê hương.',
      p2: 'Vườn Tinh Dầu không đơn thuần là đơn vị sản xuất tinh dầu thương mại, mà là cầu nối gìn giữ hệ sinh thái rừng nhiệt đới. Mỗi mẻ chưng cất là sự cam kết bền vững: không sử dụng hóa chất tổng hợp, tôn trọng nhịp sinh trưởng tự nhiên và tạo sinh kế ổn định cho bà con đồng bào thiểu số Cơ Tu.',
      stat1Number: '100%',
      stat1Label: 'Chiết xuất tự nhiên bản địa',
      stat2Number: '500+',
      stat2Label: 'Hộ nông dân liên kết bền vững',
      stat3Number: '03',
      stat3Label: 'Vùng thổ nhưỡng đặc hữu',
    },
    quality: {
      eyebrow: 'Cam kết chất lượng',
      title: 'Quy chuẩn kiểm nghiệm khắt khe',
      description:
        'Mỗi giọt tinh dầu đến tay khách hàng đều trải qua quy trình kiểm nghiệm sắc ký khí phổ khối (GC-MS) độc lập, đảm bảo hàm lượng hoạt chất tự nhiên cao nhất và hoàn toàn không pha trộn.',
    },
    contact: {
      hotline: '0833-15-3388',
      email: 'info@vuontinhdau.vn',
      address: 'Số 08, Đường Trung Lương 3, P. Hòa Xuân, Q. Cẩm Lệ, TP. Đà Nẵng',
      researchUnit:
        'Trung tâm Khoa học và Chuyển giao Công Nghệ Nông nghiệp VSA (Chi nhánh Công ty TNHH Ville De Faifo Việt Nam)',
      facilityName:
        'HTX Dược liệu và Nông sản sạch Cách Mạng Xanh (Thôn Tr\'Hy, Hùng Sơn, Tây Giang)',
      distributor: 'Công ty TNHH M-MADE Việt Nam',
    },
  },
  products: DEFAULT_PRODUCTS,
  regions: DEFAULT_REGIONS,
  processSteps: DEFAULT_PROCESS_STEPS,
  articles: DEFAULT_ARTICLES,
  seo: DEFAULT_SEO_CONFIG,
};
