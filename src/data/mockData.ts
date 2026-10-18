import { Product, Region, ProcessStep, Article } from '../types';
import { CATALOG_PRODUCTS } from './catalogData';
import { getArticleRealtimeDate } from '../utils/dateHelper';
import { FULL_ARTICLES } from './articlesData';

export const HERO_IMAGE = "/images/banner/banner-hero-cam-rung-tay-giang.jpg";
export const FARMER_IMAGE = "https://res.cloudinary.com/q6vqmtq4/image/upload/v1791196666/Farmers_harvesting_and_scientist__20261005173709.jpg";
export const DISTILLATION_BG = "/images/background/quy-trinh-chung-cat-tinh-dau.jpg";
export const BRAND_STORY_BG = "https://res.cloudinary.com/q6vqmtq4/image/upload/v1791197204/Gemini_Generated_Image_sa17v9sa17v9sa17.png";

export const REGIONS: Region[] = [
  {
    id: 'tay-giang',
    name: 'Tây Giang (Quảng Nam)',
    province: 'Quảng Nam',
    tagline: 'Đại ngàn Trường Sơn hùng vĩ',
    herbs: ['Cam rừng', 'Tràm', 'Sả', 'Quế...'],
    description: 'Khí hậu mát mẻ quanh năm, thổ nhưỡng rừng già nguyên sinh thích hợp cho cam rừng cổ thụ và các loài dược liệu quý với hàm lượng tinh dầu đậm đặc bậc nhất.',
    fullStory: 'Tây Giang nằm ở sườn Đông dãy Trường Sơn, với độ cao trung bình trên 1.200m so với mực nước biển. Nơi đây sở hữu khí hậu á nhiệt đới trong lành cùng những cánh rừng nguyên sinh bạt ngàn. Trung tâm Khoa học và Chuyển giao Công Nghệ Nông nghiệp VSA phối hợp cùng HTX Dược liệu và Nông sản sạch Cách Mạng Xanh (Thôn Tr\'Hy, Hùng Sơn) đồng hành với bà con bản địa thu hái quả cam rừng tự nhiên bền vững, bảo tồn hệ sinh thái đại ngàn.',
    altitude: '1.200m - 1.500m',
    climate: 'Á nhiệt đới núi cao, sương mù quanh năm',
    image: 'https://res.cloudinary.com/q6vqmtq4/image/upload/v1791196252/tay-giang-quang-nam-4_1633345876.webp'
  },
  {
    id: 'quang-ngai',
    name: 'Quảng Ngãi',
    province: 'Duyên hải Nam Trung Bộ',
    tagline: 'Vùng đất nắng gió hội tụ tinh hoa',
    herbs: ['Gừng', 'nghệ', 'sả...'],
    description: 'Vùng đất nắng gió, thích hợp cho cây gừng, nghệ, sả, bưởi... với hương thơm cay nồng đặc trưng và hoạt chất tinh dầu cao vượt trội.',
    fullStory: 'Được nuôi dưỡng bởi lượng ánh nắng dồi dào và nguồn nước ngầm trong mát từ thượng nguồn sông Trà Khúc, vùng đất Quảng Ngãi mang lại cho các loại cây tinh dầu hàm lượng este thơm và cineol tự nhiên vượt trội. Bà con nông dân tại các hợp tác xã liên kết của Vườn Tinh Dầu cam kết 100% không sử dụng phân bón hóa học hay thuốc trừ sâu.',
    altitude: '50m - 300m',
    climate: 'Nhiệt đới gió mùa, nắng ấm dồi dào',
    image: 'https://res.cloudinary.com/q6vqmtq4/image/upload/v1791196398/46416efb-41c5-4f77-921e-3a6a50b050d5dyxr-1731894587199-1731894588073779201541.jpg'
  },
  {
    id: 'ninh-binh',
    name: 'Ninh Bình',
    province: 'Vùng đất di sản & Rừng Quốc gia Cúc Phương',
    tagline: 'Nơi Thiên Nhiên Kết Tinh Thành Hương',
    herbs: ['Tràm gió', 'Bạc hà', 'Thảo mộc Cúc Phương...'],
    description: 'Giữa những dãy núi đá vôi hàng triệu năm tuổi và rừng nguyên sinh Cúc Phương, tạo nên những giọt tinh dầu mang hương thơm thuần khiết và đậm dấu ấn bản địa.',
    fullStory: 'Giữa những dãy núi đá vôi hàng triệu năm tuổi, những dòng sông hiền hòa và những cánh rừng xanh trải dài, Ninh Bình mang trong mình vẻ đẹp giao hòa giữa thiên nhiên và lịch sử. Không chỉ nổi tiếng với quần thể danh thắng Tràng An hay Cúc Phương, vùng đất này còn sở hữu hệ sinh thái phong phú, là nơi nhiều loài cây dược liệu và thực vật hương thơm sinh trưởng mạnh mẽ. Đối với VSA LAB, Ninh Bình không chỉ là một vùng nguyên liệu. Đó là nơi thiên nhiên kể câu chuyện về sự cân bằng, nơi mỗi loài cây lớn lên trong sự nuôi dưỡng của đất trời để tạo nên những giọt tinh dầu mang hương thơm thuần khiết và đậm dấu ấn bản địa.',
    altitude: '20m - 648m (Đỉnh Mây Bạc)',
    climate: 'Nhiệt đới gió mùa miền Bắc, 4 mùa rõ rệt',
    image: '/ninh-binh.jpg'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 'Bước 01',
    number: '01',
    title: 'Trồng trọt & chăm sóc',
    subtitle: 'Nông nghiệp hữu cơ',
    description: 'Áp dụng nghiêm ngặt phương pháp canh tác hữu cơ, hoàn toàn không hóa chất trừ sâu hay phân bón tổng hợp.',
    details: [
      'Chọn giống bản địa thuần chủng từ các viện nông nghiệp',
      'Đất canh tác được nghỉ luân canh và xét nghiệm định kỳ',
      'Phân bón vi sinh tự ủ từ bã thực vật và vỏ trấu'
    ],
    image: '/images/background/quy-trinh-buoc-1-canh-tac-huu-co.jpg',
    iconName: 'Sprout'
  },
  {
    step: 'Bước 02',
    number: '02',
    title: 'Thu hoạch & sơ chế',
    subtitle: 'Đúng thời điểm vàng',
    description: 'Thu hái thủ công vào sáng sớm khi sương vừa tan để hàm lượng tinh dầu và hoạt chất thơm đạt đỉnh cao nhất.',
    details: [
      'Thu hái chọn lọc bằng tay từng búp non hoặc lá trưởng thành',
      'Loại bỏ hoàn toàn lá úa, tạp chất và đất cát trong 2 giờ đầu',
      'Sơ chế và rửa sạch bằng nguồn nước giếng ngầm tự nhiên'
    ],
    image: '/images/products/tinh-dau-que-tra-bong-quang-ngai.jpg',
    iconName: 'Scissors'
  },
  {
    step: 'Bước 03',
    number: '03',
    title: 'Chiết xuất hiện đại',
    subtitle: 'Chưng cất lôi cuốn hơi nước',
    description: 'Sử dụng hệ thống nồi chưng cất inox 304 tiêu chuẩn dược phẩm, kiểm soát nhiệt độ và áp suất chính xác bằng vi tính.',
    details: [
      'Công nghệ chưng cất lôi cuốn hơi nước áp suất thấp',
      'Ngưng tụ khép kín bằng dàn làm lạnh đa tầng',
      'Giữ trọn vẹn phổ hương tự nhiên và các vi chất quý giá'
    ],
    image: '/images/blog/bai-viet-nghe-thuat-chieu-chua-mui-huong.jpg',
    iconName: 'Flame'
  },
  {
    step: 'Bước 04',
    number: '04',
    title: 'Kiểm nghiệm chất lượng',
    subtitle: 'Tiêu chuẩn quốc tế',
    description: 'Mỗi mẻ chiết xuất đều được phân tích sắc ký khí phổ khối (GC-MS) tại trung tâm kiểm định độc lập uy tín.',
    details: [
      'Phân tích định tính & định lượng hoạt chất chính',
      'Xác nhận không chứa cồn, hương liệu công nghiệp hay dầu khoáng',
      'Cấp chứng thư phân tích COA cho từng lô xuất xưởng'
    ],
    image: '/images/background/quy-trinh-buoc-4-kiem-nghiem-gcms.jpg',
    iconName: 'Microscope'
  },
  {
    step: 'Bước 05',
    number: '05',
    title: 'Đóng chai thành phẩm',
    subtitle: 'Phòng sạch vô trùng',
    description: 'Đóng chai thủy tinh hổ phách chuẩn dược phẩm chống tia UV, niêm phong nắp nhỏ giọt và mã QR truy xuất nguồn gốc.',
    details: [
      'Quy trình đóng chai khép kín trong môi trường vô trùng Class 100,000',
      'Chai thủy tinh tối màu nhập khẩu chống oxy hóa quang học',
      'Mỗi chai mang mã định danh duy nhất truy xuất đến từng luống đất'
    ],
    image: '/images/products/tinh-dau-hoa-nhai-sambac.jpg',
    iconName: 'PackageCheck'
  }
];

export const PRODUCTS: Product[] = CATALOG_PRODUCTS;

export const ARTICLES: Article[] = FULL_ARTICLES;

export const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', code: 'ISO', subtitle: 'Quản lý chất lượng quốc tế', icon: 'Award' },
  { name: 'GMP Certified', code: 'GMP', subtitle: 'Thực hành sản xuất tốt', icon: 'ShieldCheck' },
  { name: 'USDA Organic', code: 'USDA', subtitle: 'Tiêu chuẩn canh tác hữu cơ', icon: 'Leaf' },
  { name: 'Quatest 3', code: 'QUATEST', subtitle: 'Kiểm nghiệm độc lập nhà nước', icon: 'CheckCircle2' },
  { name: 'VietGAP', code: 'VIETGAP', subtitle: 'Nông nghiệp sạch Việt Nam', icon: 'BadgeCheck' }
];
