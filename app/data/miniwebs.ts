export type MiniWebDivision = 'FS' | 'UTI' | 'MDS' | 'DLS' | 'SP' | 'BMC' | 'GPD'
export type MiniWebStatus = 'Live' | 'Monitor' | 'Stop'
export type MiniWebPageType = 'Advanced MiniWeb' | 'Basic MiniWeb' | 'Campaign MiniWeb'

export interface MiniWeb {
  division: MiniWebDivision
  useCase: string
  product: string
  serviceName: string
  url: string
  status: MiniWebStatus
  pageType: MiniWebPageType
  hasAPI?: boolean
  hasSimulation?: boolean
}

export const miniwebs: MiniWeb[] = [
  // --- MDS ---
  { division: 'MDS', useCase: 'Cinema', product: 'MDS - Cinema', serviceName: 'Cinema', url: 'https://www.momo.vn/cinema', status: 'Monitor', pageType: 'Advanced MiniWeb', hasAPI: true },
  { division: 'MDS', useCase: 'Donation', product: 'MDS - Donation', serviceName: 'Ví Nhân Ái', url: 'https://www.momo.vn/vi-nhan-ai', status: 'Live', pageType: 'Advanced MiniWeb', hasAPI: true },
  { division: 'MDS', useCase: 'Donation', product: 'MDS - Donation', serviceName: 'Trái Tim MoMo', url: 'https://www.momo.vn/trai-tim-momo', status: 'Monitor', pageType: 'Advanced MiniWeb', hasAPI: true },
  { division: 'MDS', useCase: 'Donation', product: 'MDS - Donation', serviceName: 'Heo Đất MoMo', url: 'https://www.momo.vn/heo-dat-momo', status: 'Monitor', pageType: 'Advanced MiniWeb', hasAPI: true },
  { division: 'MDS', useCase: 'OTA', product: 'MDS - OTA', serviceName: 'Du Lịch - Đi Lại', url: 'https://www.momo.vn/du-lich-di-lai', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'MDS', useCase: 'Flight', product: 'MDS - Flight', serviceName: 'Vé Máy Bay', url: 'https://www.momo.vn/ve-may-bay', status: 'Stop', pageType: 'Advanced MiniWeb', hasAPI: true },
  { division: 'MDS', useCase: 'OTA', product: 'MDS - OTA', serviceName: 'Điểm Đến', url: 'https://www.momo.vn/du-lich-di-lai/diem-den', status: 'Live', pageType: 'Advanced MiniWeb', hasAPI: true },
  { division: 'MDS', useCase: 'Hourly Hour', product: 'MDS - Hourly Hour', serviceName: 'Khách Sạn Theo Giờ', url: 'https://www.momo.vn/khach-san-theo-gio', status: 'Stop', pageType: 'Advanced MiniWeb', hasAPI: true },
  { division: 'MDS', useCase: 'OA', product: 'MDS - OA', serviceName: 'Business Page', url: 'https://www.momo.vn/page', status: 'Stop', pageType: 'Advanced MiniWeb', hasAPI: true },
  { division: 'MDS', useCase: 'Bus', product: 'MDS - Bus', serviceName: 'Vé Xe', url: 'https://www.momo.vn/ve-xe', status: 'Live', pageType: 'Advanced MiniWeb', hasAPI: true },
  { division: 'MDS', useCase: 'OTA', product: 'MDS - OTA', serviceName: 'Vé Tàu Hỏa', url: 'https://www.momo.vn/ve-tau-hoa', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'MDS', useCase: 'OTA', product: 'MDS - OTA', serviceName: 'Vé Khu Vui Chơi', url: 'https://www.momo.vn/trai-nghiem-du-lich', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'MDS', useCase: 'OTA', product: 'MDS - OTA', serviceName: 'Thuê Xe Tự Lái', url: 'https://www.momo.vn/thue-xe-tu-lai', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'MDS', useCase: 'OTA', product: 'MDS - OTA', serviceName: 'Đặt Khách Sạn', url: 'https://www.momo.vn/dat-khach-san', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'MDS', useCase: 'Thổ Địa', product: 'MDS - Thổ Địa', serviceName: 'Thổ Địa MoMo', url: 'https://www.momo.vn/tho-dia-momo', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'MDS', useCase: 'Promotion', product: 'MDS - Promotion', serviceName: 'XU', url: 'https://www.momo.vn/xu', status: 'Live', pageType: 'Basic MiniWeb' },
  // --- FS ---
  { division: 'FS', useCase: 'Loan', product: 'FS - Loan', serviceName: 'Vay Nhanh', url: 'https://www.momo.vn/vay-nhanh', status: 'Live', pageType: 'Advanced MiniWeb', hasSimulation: true },
  { division: 'FS', useCase: 'InsurTech', product: 'FS - InsurTech', serviceName: 'Bảo Hiểm Ô Tô Vật Chất', url: 'https://www.momo.vn/bao-hiem-o-to/vat-chat', status: 'Live', pageType: 'Advanced MiniWeb', hasAPI: true },
  { division: 'FS', useCase: 'InsurTech', product: 'FS - InsurTech', serviceName: 'Bảo Hiểm Xe Máy', url: 'https://www.momo.vn/bao-hiem-xe-may', status: 'Live', pageType: 'Advanced MiniWeb', hasAPI: true },
  { division: 'FS', useCase: 'BHYT', product: 'FS - BHYT', serviceName: 'Bảo Hiểm Y Tế', url: 'https://www.momo.vn/bao-hiem-y-te', status: 'Live', pageType: 'Advanced MiniWeb', hasAPI: true },
  { division: 'FS', useCase: 'InsurTech', product: 'FS - InsurTech', serviceName: 'Bảo Hiểm Ô Tô', url: 'https://www.momo.vn/bao-hiem-o-to', status: 'Live', pageType: 'Advanced MiniWeb' },
  { division: 'FS', useCase: 'InsurTech', product: 'FS - InsurTech', serviceName: 'Bảo Hiểm Ô Tô Bắt Buộc', url: 'https://www.momo.vn/bao-hiem-o-to/bat-buoc', status: 'Live', pageType: 'Advanced MiniWeb' },
  { division: 'FS', useCase: 'Overrall', product: 'FS - Overrall', serviceName: 'Tài Chính - Bảo Hiểm', url: 'https://www.momo.vn/tai-chinh-4-khong', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'Gold', product: 'FS - Gold', serviceName: 'Tiệm Vàng Online', url: 'https://www.momo.vn/tiem-vang-online', status: 'Stop', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'InsurTech', product: 'FS - InsurTech', serviceName: 'Bảo Hiểm Du Lịch', url: 'https://www.momo.vn/bao-hiem-du-lich', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'InsurTech', product: 'FS - InsurTech', serviceName: 'Bảo Hiểm Du Lịch Toàn Diện', url: 'https://www.momo.vn/bao-hiem-du-lich-toan-dien', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'InsurTech', product: 'FS - InsurTech', serviceName: 'Bảo Hiểm Du Lịch Quốc Tế', url: 'https://www.momo.vn/bao-hiem-du-lich-quoc-te', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'InsurTech', product: 'FS - InsurTech', serviceName: 'Bảo Hiểm Trễ Chuyến Bay', url: 'https://www.momo.vn/bao-hiem-tre-chuyen-bay', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'InsurTech', product: 'FS - InsurTech', serviceName: 'Thanh Toán Phí Bảo Hiểm', url: 'https://www.momo.vn/thanh-toan-phi-bao-hiem', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'Critical illness', product: 'FS - Critical illness', serviceName: 'Bảo Hiểm Sức Khỏe +', url: 'https://www.momo.vn/bao-hiem-suc-khoe', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'TTT', product: 'FS - TTT', serviceName: 'Túi Thần Tài', url: 'https://www.momo.vn/tui-than-tai', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'PayLater', product: 'FS - PayLater', serviceName: 'Ví Trả Sau', url: 'https://www.momo.vn/vi-tra-sau', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'CreditTech', product: 'FS - CreditTech', serviceName: 'Thanh Toán Thẻ Tín Dụng', url: 'https://www.momo.vn/thanh-toan-the-tin-dung', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'Online Saving', product: 'FS - Online Saving', serviceName: 'Tiết Kiệm Online', url: 'https://www.momo.vn/tiet-kiem-online', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'Device Financing', product: 'FS - Device Financing', serviceName: 'Trả Góp Apple', url: 'https://www.momo.vn/tra-gop-san-pham-apple', status: 'Monitor', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'CreditTech', product: 'FS - CreditTech', serviceName: 'Thanh Toán Khoản Vay', url: 'https://www.momo.vn/thanh-toan-khoan-vay', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'CreditTech', product: 'FS - CreditTech', serviceName: 'Mở Thẻ Tín Dụng', url: 'https://www.momo.vn/mo-the-tin-dung', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'Brokerage', product: 'FS - Brokerage', serviceName: 'Sàn Đầu Tư', url: 'https://www.momo.vn/san-dau-tu', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'Loan', product: 'FS - Loan', serviceName: 'Trả Góp Flik', url: 'https://www.momo.vn/tra-gop-flik', status: 'Stop', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'Source of Funds', product: 'FS - Source of Funds', serviceName: 'Mở Tài Khoản Ngân Hàng', url: 'https://www.momo.vn/mo-tai-khoan-ngan-hang', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'Mutual Funds', product: 'FS - Mutual Funds', serviceName: 'Chứng Chỉ Quỹ', url: 'https://www.momo.vn/chung-chi-quy', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'Loan', product: 'FS - Loan', serviceName: 'Vay Nhanh Bán Hàng', url: 'https://www.momo.vn/vay-nhanh-kinh-doanh', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'Brokerage', product: 'FS - Brokerage', serviceName: 'Chứng Khoán', url: 'https://www.momo.vn/chung-khoan', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'CreditTech', product: 'FS - CreditTech', serviceName: 'Tài Chính Siêu Tốc Homecredit', url: 'https://www.momo.vn/tai-chinh-sieu-toc-homecredit', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'Overrall', product: 'FS - Overrall', serviceName: 'Trung Tâm Tài Chính (Finhub)', url: 'https://www.momo.vn/trung-tam-tai-chinh', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'FS', useCase: 'Credit Score', product: 'FS - Credit Score', serviceName: 'Điểm Tín Dụng', url: 'https://www.momo.vn/diem-tin-dung', status: 'Live', pageType: 'Basic MiniWeb' },
  // --- UTI ---
  { division: 'UTI', useCase: 'Telco', product: 'UTI - Telco', serviceName: 'Data 3G/4G', url: 'https://www.momo.vn/nap-data', status: 'Live', pageType: 'Advanced MiniWeb', hasSimulation: true },
  { division: 'UTI', useCase: 'Billpay', product: 'UTI - Billpay', serviceName: 'Thanh Toán Hóa Đơn', url: 'https://www.momo.vn/thanh-toan-hoa-don', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'UTI', useCase: 'Billpay', product: 'UTI - Billpay', serviceName: 'Điện', url: 'https://www.momo.vn/dien', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'UTI', useCase: 'Billpay', product: 'UTI - Billpay', serviceName: 'Nước', url: 'https://www.momo.vn/nuoc', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'UTI', useCase: 'Billpay', product: 'UTI - Billpay', serviceName: 'Internet', url: 'https://www.momo.vn/internet', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'UTI', useCase: 'Billpay', product: 'UTI - Billpay', serviceName: 'Truyền Hình', url: 'https://www.momo.vn/truyen-hinh', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'UTI', useCase: 'Billpay', product: 'UTI - Billpay', serviceName: 'Chung Cư', url: 'https://www.momo.vn/chung-cu', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'UTI', useCase: 'Billpay', product: 'UTI - Billpay', serviceName: 'Phí Xét Tuyển', url: 'https://www.momo.vn/phi-xet-tuyen', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'UTI', useCase: 'Utilities', product: 'UTI - Utilities', serviceName: 'Viễn Thông Tiện Ích', url: 'https://www.momo.vn/vien-thong-tien-ich', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'UTI', useCase: 'Billpay', product: 'UTI - Billpay', serviceName: 'Phí Không Dừng', url: 'https://www.momo.vn/phi-khong-dung', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'UTI', useCase: 'Telco', product: 'UTI - Telco', serviceName: 'Nạp Tiền Điện Thoại', url: 'https://www.momo.vn/nap-tien-dien-thoai', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'UTI', useCase: 'Telco', product: 'UTI - Telco', serviceName: 'Sim Chính Chủ', url: 'https://www.momo.vn/sim-so-dep', status: 'Live', pageType: 'Advanced MiniWeb', hasAPI: true },
  { division: 'UTI', useCase: 'Telco', product: 'UTI - Telco', serviceName: 'eSim Du Lịch', url: 'https://www.momo.vn/esim-du-lich', status: 'Live', pageType: 'Advanced MiniWeb', hasAPI: true },
  { division: 'UTI', useCase: 'Billpay', product: 'UTI - Billpay', serviceName: 'Đánh Giá Năng Lực', url: 'https://www.momo.vn/danh-gia-nang-luc', status: 'Live', pageType: 'Basic MiniWeb' },
  // --- DLS ---
  { division: 'DLS', useCase: 'Telco', product: 'DLS - Telco', serviceName: 'Viễn Thông', url: 'https://www.momo.vn/vien-thong', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Cashien', product: 'DLS - Cashien', serviceName: 'Hoàn Tiền Mua Sắm', url: 'https://www.momo.vn/hoan-tien-mua-sam', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Token', product: 'DLS - Token', serviceName: 'Dịch Vụ Liên Kết', url: 'https://www.momo.vn/dich-vu-lien-ket', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'OTT', product: 'DLS - OTT', serviceName: 'Giải Trí Online', url: 'https://www.momo.vn/giai-tri-online', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Hand Driving', product: 'DLS - Hand Driving', serviceName: 'Grab', url: 'https://www.momo.vn/dat-grab', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Application Store', product: 'DLS - Application Store', serviceName: 'Thanh Toán App Store', url: 'https://www.momo.vn/apple-services', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Application Store', product: 'DLS - Application Store', serviceName: 'Thanh Toán Google Play', url: 'https://www.momo.vn/thanh-toan-google-play', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Mini App', product: 'DLS - Mini App', serviceName: 'Mini App', url: 'https://www.momo.vn/mini-app-kho-tien-ich', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Digital Entertainment', product: 'DLS - Digital Entertainment', serviceName: 'Nạp Thẻ Game', url: 'https://www.momo.vn/nap-the-game', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Digital Entertainment', product: 'DLS - Digital Entertainment', serviceName: 'Napthengay', url: 'https://www.momo.vn/napthengayvn', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Offline Payment', product: 'DLS - Offline Payment', serviceName: 'Trang Doanh Nghiệp', url: 'https://www.momo.vn/trang-doanh-nghiep', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Offline Payment', product: 'DLS - Offline Payment', serviceName: 'Đối Tác Doanh Nghiệp', url: 'https://www.momo.vn/doi-tac-doanh-nghiep', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Offline Payment', product: 'DLS - Offline Payment', serviceName: 'QR Đa Năng', url: 'https://www.momo.vn/qr-da-nang', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Offline Payment', product: 'DLS - Offline Payment', serviceName: 'Cộng Tác Viên MoMo', url: 'https://www.momo.vn/cong-tac-vien', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Hand Driving', product: 'DLS - Hand Driving', serviceName: 'Đặt Xe Công Nghệ', url: 'https://www.momo.vn/dat-xe-cong-nghe', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Application Store', product: 'DLS - Application Store', serviceName: 'App Store Card', url: 'https://www.momo.vn/app-store-card', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Ads Payment', product: 'DLS - Ads Payment', serviceName: 'Ads Payment', url: 'https://www.momo.vn/thanh-toan-quang-cao', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Cross Border', product: 'DLS - Cross Border', serviceName: 'Thanh Toán Quốc Tế', url: 'https://www.momo.vn/thanh-toan-quoc-te', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Digital Entertainment', product: 'DLS - Digital Entertainment', serviceName: 'Apple Music', url: 'https://www.momo.vn/apple-music', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'OTT', product: 'DLS - OTT', serviceName: 'VTVGo', url: 'https://www.momo.vn/vtvgo', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Digital Entertainment', product: 'DLS - Digital Entertainment', serviceName: 'Nạp Xu Tiktok', url: 'https://www.momo.vn/nap-xu-tiktok', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'DLS', useCase: 'Offline Payment', product: 'DLS - Offline Payment', serviceName: 'Soundbox', url: 'https://www.momo.vn/loa-thong-bao-chuyen-khoan', status: 'Live', pageType: 'Basic MiniWeb' },
  // --- SP ---
  { division: 'SP', useCase: 'P2P', product: 'SP - P2P', serviceName: 'Chuyển Nhận Tiền', url: 'https://www.momo.vn/chuyen-nhan-tien', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'SP', useCase: 'P2P', product: 'SP - P2P', serviceName: 'Chuyển Tiền', url: 'https://www.momo.vn/chuyen-tien', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'SP', useCase: 'Remittance', product: 'SP - Remittance', serviceName: 'Nhận Tiền Quốc Tế', url: 'https://www.momo.vn/nhan-tien-quoc-te', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'SP', useCase: 'W2B', product: 'SP - W2B', serviceName: 'Chuyển Tiền Ngân Hàng', url: 'https://www.momo.vn/chuyen-tien-ngan-hang', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'SP', useCase: 'Quy', product: 'SP - Quy', serviceName: 'Quỹ Nhóm', url: 'https://www.momo.vn/quy-nhom', status: 'Live', pageType: 'Basic MiniWeb' },
  // --- BMC ---
  { division: 'BMC', useCase: 'Trust', product: 'BMC - Trust', serviceName: 'An Toàn Bảo Mật', url: 'https://www.momo.vn/an-toan-bao-mat', status: 'Live', pageType: 'Campaign MiniWeb' },
  { division: 'BMC', useCase: 'Brand', product: 'BMC - Brand', serviceName: 'Trợ Thủ Tài Chính', url: 'https://www.momo.vn/tro-thu-tai-chinh', status: 'Live', pageType: 'Campaign MiniWeb' },
  { division: 'BMC', useCase: 'Gamification', product: 'BMC - Gamification', serviceName: 'Lắc Xì', url: 'https://www.momo.vn/lac-xi', status: 'Live', pageType: 'Campaign MiniWeb' },
  { division: 'BMC', useCase: 'Gamification', product: 'BMC - Gamification', serviceName: 'QR Lì Xì', url: 'https://www.momo.vn/gioi-thieu-ban-be-qrlixi2024', status: 'Stop', pageType: 'Campaign MiniWeb' },
  { division: 'BMC', useCase: 'Brand', product: 'BMC - Brand', serviceName: 'Sale Tất Tay', url: 'https://momo.vn/sale-tat-tay', status: 'Stop', pageType: 'Campaign MiniWeb' },
  { division: 'BMC', useCase: 'Brand', product: 'BMC - Brand', serviceName: 'The Next KOC', url: 'https://momo.vn/the-next-koc', status: 'Stop', pageType: 'Campaign MiniWeb' },
  { division: 'BMC', useCase: 'Trust', product: 'BMC - Trust', serviceName: 'Cùng Học An Toàn Bảo Mật', url: 'https://momo.vn/cung-hoc-an-toan-bao-mat', status: 'Stop', pageType: 'Campaign MiniWeb' },
  { division: 'BMC', useCase: 'Trust', product: 'BMC - Trust', serviceName: 'Bảo Vệ Đảo', url: 'https://www.momo.vn/bao-ve-dao', status: 'Stop', pageType: 'Campaign MiniWeb' },
  { division: 'BMC', useCase: 'Trust', product: 'BMC - Trust', serviceName: '5 Tường Bảo Mật', url: 'https://www.momo.vn/5-tuong-bao-mat', status: 'Stop', pageType: 'Campaign MiniWeb' },
  { division: 'BMC', useCase: 'Gamification', product: 'BMC - Gamification', serviceName: 'Kho Báu Biển Xanh', url: 'https://www.momo.vn/kho-bau-bien-xanh', status: 'Stop', pageType: 'Campaign MiniWeb' },
  { division: 'BMC', useCase: 'Gamification', product: 'BMC - Gamification', serviceName: 'Tài Chính Du Ký', url: 'https://www.momo.vn/tai-chinh-du-ky', status: 'Stop', pageType: 'Campaign MiniWeb' },
  { division: 'BMC', useCase: 'Gamification', product: 'BMC - Gamification', serviceName: 'Đấu Trường Tri Thức', url: 'https://www.momo.vn/dau-truong-tri-thuc', status: 'Stop', pageType: 'Campaign MiniWeb' },
  { division: 'BMC', useCase: 'Gamification', product: 'BMC - Gamification', serviceName: 'Super Mega 2025', url: 'https://www.momo.vn/super-mega-2025', status: 'Stop', pageType: 'Campaign MiniWeb' },
  // --- GPD ---
  { division: 'GPD', useCase: 'Trust', product: 'GPD - Trust', serviceName: 'Xác Thực Tài Khoản', url: 'https://www.momo.vn/xac-thuc-tai-khoan', status: 'Live', pageType: 'Campaign MiniWeb' },
  { division: 'GPD', useCase: 'QLCT', product: 'GPD - QLCT', serviceName: 'Quản Lý Chi Tiêu', url: 'https://www.momo.vn/quan-ly-chi-tieu', status: 'Live', pageType: 'Basic MiniWeb' },
  { division: 'GPD', useCase: 'Trust', product: 'GPD - Trust', serviceName: 'Xác Thực NFC', url: 'https://www.momo.vn/xac-thuc-nfc', status: 'Live', pageType: 'Campaign MiniWeb' },
]
