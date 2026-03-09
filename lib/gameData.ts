import type { QuestionData, GiftData } from './types'

export const TOTAL_STEPS = 30
export const CORRECT_STEPS = 4
export const WRONG_STEPS = 1
export const QUESTION_TIME = 20

export const PLAYER_CONFIGS = [
  { avatar: '🦊', color: '#EF4444' },
  { avatar: '🦅', color: '#3B82F6' },
  { avatar: '🦁', color: '#22C55E' },
  { avatar: '🐉', color: '#A855F7' },
  { avatar: '🦄', color: '#F97316' },
  { avatar: '🐺', color: '#EC4899' },
]

// Snake-path layout: 3 rows × 7 cols = 21 positions (0..20)
export const TRACK_LAYOUT = [
  [0, 1, 2, 3, 4, 5, 6],
  [13, 12, 11, 10, 9, 8, 7],
  [14, 15, 16, 17, 18, 19, 20],
]

export const QUESTIONS: QuestionData[] = [
  { text: 'Trong công thức giá trị hàng hóa W = c + v + m, bộ phận nào đại diện cho phần giá trị mới do người lao động tạo ra dôi ra ngoài giá trị sức lao động?', options: ['c (Tư bản bất biến)', 'v (Tư bản khả biến)', 'm (Giá trị thặng dư)', 'W (Giá trị hàng hóa)'], correct: 2 },
  { text: 'Theo Karl Marx, giá trị thặng dư siêu ngạch là gì?', options: ['Phần lợi nhuận thu được nhờ tăng giá bán sản phẩm', 'Phần lợi nhuận thu được nhờ cắt giảm lương công nhân', 'Phần lợi nhuận cao hơn mức bình thường của thị trường nhờ công nghệ tiên tiến', 'Toàn bộ số tiền doanh nghiệp thu được sau khi bán hàng'], correct: 2 },
  { text: 'Công nghệ nào sau đây được nhắc đến trong tài liệu như là công cụ giúp tăng năng suất mạnh mẽ trong kỷ nguyên 4.0?', options: ['Động cơ hơi nước', 'Máy dệt thô sơ', 'Trí tuệ nhân tạo (AI) và Robot tự động', 'Phương pháp sản xuất thủ công'], correct: 2 },
  { text: 'Theo tài liệu, công nghệ hiện đại giúp doanh nghiệp giảm yếu tố nào sau đây trong quá trình sản xuất?', options: ['Giá bán sản phẩm trên thị trường', 'Chi phí sản xuất và số lượng lao động cần thiết', 'Chất lượng của sản phẩm hàng hóa', 'Thời gian sử dụng máy móc'], correct: 1 },
  { text: 'Trong ví dụ đơn giản của tài liệu, mức chi phí sản xuất của Công ty A (dùng máy cũ) là bao nhiêu?', options: ['100k', '60k', '80k', '40k'], correct: 2 },
  { text: 'Công ty B đạt được mức chi phí sản xuất là bao nhiêu nhờ ứng dụng robot tự động?', options: ['100k', '80k', '60k', '40k'], correct: 2 },
  { text: 'Mức lợi nhuận mà Công ty B thu được trong ví dụ minh họa là bao nhiêu?', options: ['20k', '100k', '40k', '60k'], correct: 2 },
  { text: 'Theo ví dụ so sánh giữa 2 công ty, phần giá trị thặng dư siêu ngạch mà Công ty B đạt được là bao nhiêu?', options: ['40k', '100k', '20k', '80k'], correct: 2 },
  { text: 'Yếu tố nào giúp Tesla thu được lợi nhuận cao hơn nhiều hãng xe truyền thống?', options: ['Chỉ tập trung vào việc tăng giá xe', 'Robot tự động, công nghệ pin và phần mềm hiện đại', 'Sử dụng nhiều lao động thủ công hơn', 'Ngừng đầu tư vào các phần mềm mới'], correct: 1 },
  { text: 'Amazon đã ứng dụng Trí tuệ nhân tạo (AI) vào khâu nào để tối ưu lợi nhuận?', options: ['Khâu sản xuất nguyên liệu thô', 'Quản lý vận chuyển và logistics', 'Thiết kế bao bì sản phẩm', 'Trả lương cho khách hàng mua sắm'], correct: 1 },
  { text: 'Tại sao Công ty B (chi phí 60k) lại có lợi nhuận (40k) cao gấp đôi Công ty A (chi phí 80k) trong khi cả hai đều bán cùng mức giá 100k?', options: ['Vì Công ty B có quy mô nhà xưởng lớn hơn', 'Vì Công ty B đã hạ được chi phí sản xuất cá biệt xuống dưới mức trung bình nhờ áp dụng robot tự động', 'Vì Công ty A bị thị trường ép giá bán thấp hơn so với Công ty B', 'Vì Công ty B không cần phải trả lương cho nhân viên quản lý'], correct: 1 },
  { text: 'Mối quan hệ giữa việc ứng dụng công nghệ 4.0 và chi phí sản xuất được giải thích như thế nào?', options: ['Ứng dụng công nghệ 4.0 làm tăng chi phí sản xuất do máy móc rất đắt đỏ', 'Công nghệ giúp sản xuất nhanh hơn và cần ít lao động hơn, từ đó làm giảm chi phí sản xuất', 'Công nghệ 4.0 không tác động đến chi phí mà chỉ tác động đến mẫu mã', 'Công nghệ làm tăng năng suất nhưng đồng thời làm tăng chi phí thuê nhân công chất lượng cao'], correct: 1 },
  { text: 'Cơ chế cốt lõi để tạo ra giá trị thặng dư siêu ngạch trong kỷ nguyên 4.0 là gì?', options: ['Doanh nghiệp nâng giá bán sản phẩm lên cao hơn giá thị trường chung', 'Doanh nghiệp giữ nguyên chi phí sản xuất nhưng quảng cáo sản phẩm tốt hơn', 'Doanh nghiệp giảm chi phí sản xuất cá biệt nhờ công nghệ nhưng vẫn bán theo giá thị trường', 'Doanh nghiệp yêu cầu công nhân làm việc nhiều giờ hơn với mức lương không đổi'], correct: 2 },
  { text: 'Tại sao Tesla lại có thể thu được lợi nhuận cao hơn nhiều hãng xe truyền thống dù bán sản phẩm có cùng giá trị trên thị trường?', options: ['Vì Tesla không sử dụng hệ thống logistics để vận chuyển xe', 'Vì Tesla áp dụng robot và công nghệ pin/phần mềm giúp sản xuất xe nhanh và tốn ít chi phí hơn', 'Vì xe Tesla luôn được bán với giá đắt hơn gấp đôi các loại xe xăng thông thường', 'Vì các hãng xe truyền thống bị cấm sử dụng robot tự động trong sản xuất'], correct: 1 },
  { text: 'Hệ thống tự động hóa logistics và AI đóng vai trò gì trong việc tạo ra lợi nhuận khổng lồ cho Amazon?', options: ['Giúp khách hàng mua được hàng mà không cần phải trả phí vận chuyển', 'Tối ưu hóa vận hành, giảm chi phí vận hành cá biệt xuống dưới mức của các công ty bán lẻ truyền thống', 'Giúp Amazon sản xuất ra tất cả các loại hàng hóa mà họ bán', 'Giúp Amazon không cần phải đầu tư vào hệ thống máy tính và phần mềm'], correct: 1 },
  { text: 'Phân tích trường hợp Công ty B (chi phí 60k) và Công ty A (chi phí 80k) cùng bán giá 100k. Nếu một Công ty C xuất hiện, dùng AI tối ưu hóa giúp chi phí chỉ còn 40k, thì điều gì sẽ xảy ra với Công ty B?', options: ['Công ty B sẽ trở thành doanh nghiệp có thặng dư siêu ngạch cao nhất thị trường', 'Công ty B vẫn có thặng dư siêu ngạch nhưng ít hơn Công ty C', 'Công ty B sẽ lỗ vốn vì không cạnh tranh được với Công ty C', 'Công ty B sẽ không còn thặng dư siêu ngạch nếu 40k trở thành mức chi phí trung bình mới của thị trường'], correct: 3 },
  { text: 'Tại sao việc Amazon sử dụng robot trong kho hàng lại giúp tăng giá trị thặng dư siêu ngạch theo lý thuyết của Marx?', options: ['Vì robot trực tiếp tạo ra giá trị mới thay thế cho con người', 'Vì robot giúp giảm hao phí lao động sống (giảm v) trên một đơn vị sản phẩm, hạ chi phí cá biệt xuống dưới mức trung bình ngành', 'Vì robot giúp Amazon tăng giá bán sản phẩm lên cao hơn các cửa hàng truyền thống', 'Vì robot không đòi hỏi chi phí bảo trì hay khấu hao máy móc (c)'], correct: 1 },
  { text: 'Nếu Tesla sở hữu công nghệ pin độc quyền giúp chi phí sản xuất xe thấp hơn các hãng khác 10%, nhưng họ vẫn bán xe bằng giá thị trường, phần lợi nhuận 10% này được gọi là gì?', options: ['Lợi nhuận định mức xã hội', 'Giá trị thặng dư tuyệt đối', 'Giá trị thặng dư siêu ngạch', 'Tiền thưởng từ chính phủ'], correct: 2 },
  { text: 'Hệ quả lâu dài của việc Amazon và Tesla liên tục giành được thặng dư siêu ngạch đối với người tiêu dùng là gì?', options: ['Người tiêu dùng sẽ phải mua hàng với giá ngày càng đắt đỏ', 'Năng suất xã hội tăng lên, về lâu dài giá trị hàng hóa giảm, giúp người tiêu dùng mua được sản phẩm với giá rẻ hơn', 'Người tiêu dùng sẽ không còn lựa chọn nào khác ngoài việc mua hàng từ hai công ty này', 'Chất lượng hàng hóa sẽ giảm sút do sản xuất quá nhanh bằng robot'], correct: 1 },
  { text: 'Amazon sử dụng AI để quản lý vận chuyển và logistics. Việc này tác động như thế nào đến công thức W = c + v + m của một đơn vị hàng hóa?', options: ['Làm tăng phần giá trị thặng dư m bằng cách tăng giá bán W', 'Làm giảm chi phí vận hành cá biệt (c + v), giúp phần m siêu ngạch lớn hơn khi bán theo giá thị trường', 'Làm tăng chi phí v do phải thuê chuyên gia AI với lương cao', 'Không có tác động gì vì logistics chỉ là khâu lưu thông, không tạo ra thặng dư'], correct: 1 },
  { text: 'Tại sao việc theo đuổi giá trị thặng dư siêu ngạch lại thúc đẩy sự phát triển của công nghệ toàn xã hội?', options: ['Vì doanh nghiệp muốn tiêu hết số vốn đầu tư ban đầu của mình', 'Vì để tồn tại và giành lợi nhuận vượt trội, doanh nghiệp phải liên tục cải tiến và nâng cấp công nghệ', 'Vì công nghệ mới giúp doanh nghiệp sa thải toàn bộ nhân viên trong xã hội', 'Vì máy móc hiện đại luôn có tuổi thọ thấp hơn máy móc cũ'], correct: 1 },
  { text: 'Ý nghĩa "tăng năng suất lao động" của công nghệ 4.0 trong việc tạo thặng dư được hiểu như thế nào?', options: ['Làm cho người công nhân phải làm việc với cường độ nặng hơn', 'Công nghệ giúp sản xuất được nhiều hàng hóa hơn trong cùng một khoảng thời gian so với trước đây', 'Giúp doanh nghiệp thuê được nhiều nhân viên hơn với mức lương rẻ hơn', 'Làm giảm tổng sản lượng hàng hóa trên thị trường để giữ giá bán cao'], correct: 1 },
  { text: 'Điều gì xảy ra nếu các đối thủ cạnh tranh của Công ty B cũng mua robot giống hệt Công ty B?', options: ['Lợi nhuận của Công ty B vẫn sẽ giữ nguyên mức 40k mãi mãi', 'Phần thặng dư siêu ngạch của B sẽ dần mất đi vì công nghệ này không còn là ưu thế cá biệt nữa', 'Công ty B sẽ buộc phải tăng giá bán sản phẩm lên 120k để giữ lợi nhuận', 'Mọi công ty trên thị trường sẽ đều thua lỗ do sản xuất quá nhanh'], correct: 1 },
  { text: 'Internet vạn vật (IoT) giúp doanh nghiệp dễ dàng tạo ra thặng dư siêu ngạch thông qua cách nào?', options: ['Giúp nhân viên trong nhà máy truy cập mạng xã hội nhanh hơn', 'Kết nối và tự động hóa các khâu sản xuất để tối ưu hóa năng suất và giảm chi phí vận hành', 'Tăng số lượng các bước kiểm soát thủ công trong dây chuyền sản xuất', 'Giúp doanh nghiệp liên lạc với khách hàng để yêu cầu họ trả thêm tiền'], correct: 1 },
  { text: 'Trong kỷ nguyên 4.0, công nghệ "Big Data" được hiểu là gì?', options: ['Các loại máy móc có trọng lượng lớn', 'Hệ thống dữ liệu lớn giúp tối ưu hóa sản xuất', 'Một loại robot có kích thước khổng lồ', 'Danh sách các khách hàng mua sắm'], correct: 1 },
  { text: 'Ký hiệu IoT được nhắc đến trong tài liệu là viết tắt của thuật ngữ nào?', options: ['Internal of Technology', 'Internet of Thinking', 'Internet of Things (Internet vạn vật)', 'International of Teams'], correct: 2 },
  { text: 'Đâu là kết luận đúng về bản chất của giá trị thặng dư siêu ngạch?', options: ['Là phần doanh thu bị thiếu hụt của doanh nghiệp', 'Là phần lợi nhuận vượt trội nhờ áp dụng công nghệ tiên tiến và tăng năng suất', 'Là tiền lương trả cho nhân viên thủ công', 'Là chi phí mua sắm các máy móc cũ kỹ'], correct: 1 },
  { text: 'Trong kỷ nguyên 4.0, việc thay thế con người bằng robot tự động tác động như thế nào đến năng suất?', options: ['Làm giảm năng suất vì robot không biết tư duy', 'Giúp doanh nghiệp sản xuất nhanh hơn và tốn ít chi phí hơn', 'Làm tăng chi phí sản xuất cá biệt lên cao hơn thị trường', 'Khiến giá bán sản phẩm tăng cao đột biến'], correct: 1 },
  { text: 'Giá trị thặng dư siêu ngạch đóng vai trò gì trong thời đại công nghiệp 4.0?', options: ['Là rào cản ngăn chặn sự phát triển của doanh nghiệp', 'Giúp doanh nghiệp tạo lợi thế cạnh tranh và thúc đẩy nền kinh tế', 'Làm giảm số lượng hàng hóa trên toàn thế giới', 'Loại bỏ hoàn toàn vai trò của trí tuệ nhân tạo'], correct: 1 },
  { text: 'Phân tích lợi nhuận 40k của Công ty B, phần giá trị thặng dư siêu ngạch (20k) có nguồn gốc từ đâu?', options: ['Từ việc Công ty B đã bán hàng đắt hơn Công ty A 20k', 'Từ việc Công ty B đã hạ được chi phí sản xuất cá biệt thấp hơn Công ty A nhờ ứng dụng robot', 'Từ sự hỗ trợ tài chính trực tiếp của các tập đoàn công nghệ lớn', 'Từ việc người tiêu dùng tự nguyện trả thêm tiền cho Công ty B vì họ dùng robot'], correct: 1 },
]

export const GIFTS: GiftData[] = [
  { type: 'bonus_1', name: 'Bước Nhỏ', description: 'Tiến thêm 1 bước về phía kho báu!', icon: '👟', steps: 1 },
  { type: 'bonus_2', name: 'Bước Dài', description: 'Tiến thêm 2 bước về phía kho báu!', icon: '🚀', steps: 2 },
  { type: 'bonus_2', name: 'Gió May', description: 'Gió thuận mang bạn tiến thêm 2 bước!', icon: '💨', steps: 2 },
  { type: 'bonus_3', name: 'Turbo!', description: 'Tăng tốc! Tiến thêm 3 bước!', icon: '⚡', steps: 3 },
  { type: 'extra_turn', name: 'Lượt Thưởng', description: 'Được chơi thêm một lượt nữa ngay bây giờ!', icon: '🔁', steps: 0 },
  { type: 'extra_turn', name: 'Năng Lượng', description: 'Tràn đầy năng lượng! Chơi thêm một lượt!', icon: '🔋', steps: 0 },
  { type: 'shield', name: 'Lá Chắn', description: 'Nhận lá chắn! Bảo vệ khỏi đóng băng và đổi vị trí một lần!', icon: '🛡️', steps: 0 },
  { type: 'freeze', name: 'Đóng Băng', description: 'Chọn một đối thủ để đóng băng! Họ sẽ mất lượt tiếp theo.', icon: '❄️', steps: 0 },
  { type: 'swap', name: 'Đổi Vị Trí', description: 'Đổi vị trí với người chơi gần bạn nhất trên đường đua!', icon: '🔄', steps: 0 },
  { type: 'double_loot', name: 'Nhân Đôi', description: 'Lượt tiếp theo nhận GẤP ĐÔI phần thưởng!', icon: '✨', steps: 0 },
]

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
