'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface TheorySection {
  id: string
  title: string
  icon: string
  accent: string
  content: React.ReactNode
}

const SITE_CONFIG = {
  title: 'TỔNG HỢP: GIÁ TRỊ THẶNG DƯ SIÊU NGẠCH TRONG KỶ NGUYÊN 4.0',
  subtitle: 'Kinh tế chính trị Mác – Lênin · Chuyên đề tư duy hiện đại',
  logo: '⚙️',
}

const THEORY_SECTIONS: TheorySection[] = [
  {
    id: 'foundation',
    title: '1) Nền tảng lý luận về Giá trị thặng dư (m)',
    icon: '🧠',
    accent: 'from-indigo-500 to-blue-500',
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed">
        <p>Trong kinh tế chính trị Mác – Lênin, <b>giá trị thặng dư (m)</b> là phần giá trị mới do người lao động tạo ra vượt lên trên giá trị sức lao động của họ, nhưng bị nhà tư bản chiếm đoạt.</p>
        <p>Hàng hóa sức lao động là hàng hóa đặc biệt: khi nhà tư bản mua bằng tiền lương <b>(v)</b>, người lao động không chỉ tạo ra giá trị bằng <b>v</b> mà còn tạo thêm phần <b>m</b>.</p>
        <p>Tư bản mua sức lao động gọi là <b>tư bản khả biến (v)</b>, vì trong sản xuất nó làm tăng giá trị thành <b>v + m</b>.</p>
        <p>Nguồn gốc sâu xa của lợi nhuận tư bản chủ nghĩa chính là giá trị thặng dư <b>m</b>, sinh ra từ lao động làm thuê vượt quá phần được trả lương.</p>

        <div className="overflow-hidden rounded-2xl border border-blue-200 bg-blue-50">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white">Công thức lõi</div>
          <div className="grid gap-3 p-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-3 text-center"><div className="text-xs uppercase tracking-wider text-slate-500">Tư bản bất biến</div><div className="text-xl font-black text-slate-800">c</div></div>
            <div className="rounded-xl border border-slate-200 bg-white p-3 text-center"><div className="text-xs uppercase tracking-wider text-slate-500">Tư bản khả biến</div><div className="text-xl font-black text-slate-800">v</div></div>
            <div className="rounded-xl border border-slate-200 bg-white p-3 text-center"><div className="text-xs uppercase tracking-wider text-slate-500">Thặng dư</div><div className="text-xl font-black text-slate-800">m</div></div>
          </div>
          <div className="border-t border-blue-100 px-4 py-3 text-center text-lg font-black text-blue-800">W = c + v + m</div>
        </div>
      </div>
    ),
  },
  {
    id: 'definition',
    title: '2) Định nghĩa Giá trị thặng dư siêu ngạch',
    icon: '📈',
    accent: 'from-fuchsia-500 to-pink-500',
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed">
        <p><b>Giá trị thặng dư siêu ngạch</b> là phần lợi nhuận vượt trội cao hơn mức bình thường của thị trường.</p>
        <p>Doanh nghiệp đạt được nhờ ứng dụng công nghệ hoặc phương thức sản xuất tiên tiến hơn đối thủ.</p>
        <p>Về bản chất: <b>giá trị cá biệt</b> thấp hơn <b>giá trị xã hội</b>, nhưng vẫn bán theo giá thị trường chung.</p>
        <p>Nguyên nhân trực tiếp: năng suất lao động cá biệt cao hơn mức trung bình xã hội.</p>
      </div>
    ),
  },
  {
    id: 'tech40',
    title: '3) Công nghệ 4.0: Động lực tạo thặng dư siêu ngạch',
    icon: '🤖',
    accent: 'from-cyan-500 to-emerald-500',
    content: (
      <div className="space-y-4 text-slate-700 leading-relaxed">
        <p>Trụ cột của 4.0 gồm <b>AI</b>, <b>robot tự động</b>, <b>Big Data</b>, <b>IoT</b>.</p>
        <p>Chúng giúp sản xuất nhanh hơn, giảm lao động thủ công, hạ chi phí đáng kể.</p>
        <p>AI + số hóa + Lean + Just-in-time kéo chi phí sản xuất cá biệt xuống thấp.</p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4"><div className="font-bold text-emerald-800">Chi phí cá biệt giảm</div><div className="text-sm text-emerald-700">Tối ưu thời gian, nguyên liệu, nhân lực, logistics.</div></div>
          <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4"><div className="font-bold text-cyan-800">Biên lợi nhuận tăng</div><div className="text-sm text-cyan-700">Giá bán theo mặt bằng chung nhưng chênh lệch thu về lớn hơn.</div></div>
        </div>
      </div>
    ),
  },
  {
    id: 'properties',
    title: '4) Ba tính chất của Giá trị thặng dư siêu ngạch',
    icon: '🔍',
    accent: 'from-amber-500 to-orange-500',
    content: (
      <div className="space-y-3 text-slate-700">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4"><div className="font-bold text-amber-800">Tạm thời với từng nhà tư bản</div><p className="mt-1 text-sm">Đối thủ bắt chước công nghệ → giá trị xã hội giảm → phần siêu ngạch mất dần.</p></div>
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-4"><div className="font-bold text-orange-800">Phổ biến trong toàn xã hội tư bản</div><p className="mt-1 text-sm">Luôn có doanh nghiệp đi trước một bước, tạo “dây chuyền” chuyển dịch lợi thế.</p></div>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4"><div className="font-bold text-rose-800">Biến tướng của thặng dư tương đối</div><p className="mt-1 text-sm">Đều từ tăng năng suất, nhưng diễn ra ở cấp độ doanh nghiệp cá biệt.</p></div>
      </div>
    ),
  },
  {
    id: 'examples',
    title: '5) Ví dụ điển hình từ doanh nghiệp thực tế',
    icon: '🏭',
    accent: 'from-violet-500 to-purple-500',
    content: (
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h4 className="font-black text-slate-800">Tesla</h4><p className="mt-2 text-sm leading-relaxed text-slate-600">Robot tự động hóa cao, công nghệ pin/phần mềm hiện đại giúp sản xuất nhanh với chi phí thấp hơn hãng truyền thống.</p></article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h4 className="font-black text-slate-800">Amazon</h4><p className="mt-2 text-sm leading-relaxed text-slate-600">Robot kho Kiva + AI tối ưu logistics 24/7, giảm lao động thủ công, hạ mạnh chi phí vận hành cá biệt.</p></article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h4 className="font-black text-slate-800">Viettel</h4><p className="mt-2 text-sm leading-relaxed text-slate-600">NetMind giúp giảm 30% chi phí đầu tư, tiết kiệm khoảng 131,7 tỷ đồng, tạo lợi nhuận vượt trội nhờ AI & Big Data.</p></article>
      </div>
    ),
  },
  {
    id: 'meaning',
    title: '6) Ý nghĩa đối với nền kinh tế',
    icon: '🌍',
    accent: 'from-teal-500 to-lime-500',
    content: (
      <ul className="space-y-2 text-slate-700 leading-relaxed">
        <li>• Thúc đẩy đổi mới công nghệ: tạo áp lực đầu tư R&D liên tục.</li>
        <li>• Tăng năng suất lao động xã hội: sản xuất nhiều hơn trong cùng thời gian.</li>
        <li>• Hạ giá thành xã hội về lâu dài: người tiêu dùng hưởng lợi từ công nghệ phổ biến.</li>
        <li>• Cần chính sách điều tiết: hỗ trợ doanh nghiệp nhỏ, đào tạo lại lao động.</li>
      </ul>
    ),
  },
]

const QUICK_PULSE = [
  { label: 'Lõi lý luận', value: 'W = c + v + m', color: 'from-blue-500 to-indigo-500' },
  { label: 'Động lực 4.0', value: 'AI · IoT · Big Data', color: 'from-cyan-500 to-emerald-500' },
  { label: 'Mục tiêu cạnh tranh', value: 'Chi phí cá biệt thấp hơn', color: 'from-fuchsia-500 to-rose-500' },
]

export default function TheoryPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [heroOffset, setHeroOffset] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const progress = scrollTop / (scrollHeight - clientHeight)
      setScrollProgress(Math.min(progress * 100, 100))
      setHeroOffset(scrollTop * 0.15)

      const sections = container.querySelectorAll('[data-section]')
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        if (rect.top <= containerRect.top + 180) setActiveSection(index)
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.sectionid
          if (id && entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }))
          }
        })
      },
      { root: container, threshold: 0.2 }
    )

    const watchTargets = container.querySelectorAll('[data-sectionid]')
    watchTargets.forEach((el) => observer.observe(el))

    container.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      container.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (index: number) => {
    const container = containerRef.current
    if (!container) return
    const section = container.querySelector(`[data-section="${index}"]`)
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_20%_10%,_#e9d5ff_0%,_#dbeafe_25%,_#f8fafc_60%,_#ffffff_100%)]">
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-slate-200/70 backdrop-blur">
        <div className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/40 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg">
              <span className="absolute inset-0 animate-ping rounded-xl bg-violet-400/30" />
              <span className="relative">{SITE_CONFIG.logo}</span>
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-wide text-slate-900 md:text-base">Chuyên đề cinematic</h1>
              <p className="text-xs text-slate-600 md:text-sm">{SITE_CONFIG.subtitle}</p>
            </div>
          </div>

          <button onClick={() => router.push('/game')} className="rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-orange-200 transition-transform hover:scale-105">Vào game ngay →</button>
        </div>
      </header>

      <div ref={containerRef} className="flex-1 overflow-y-auto scroll-smooth">
        <section className="relative overflow-hidden px-6 pb-14 pt-12 md:pb-20 md:pt-16">
          <div className="absolute -left-20 top-8 h-56 w-56 rounded-full bg-fuchsia-300/30 blur-3xl" style={{ transform: `translateY(${heroOffset * 0.6}px)` }} />
          <div className="absolute right-0 top-6 h-64 w-64 rounded-full bg-cyan-300/35 blur-3xl" style={{ transform: `translateY(${heroOffset * -0.4}px)` }} />

          <div className="relative mx-auto max-w-6xl">
            <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">Không còn kiểu slide truyền thống</p>
                <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 md:text-5xl">{SITE_CONFIG.title}</h2>
                <p className="mt-4 max-w-3xl text-slate-600 md:text-lg">Từ lý luận kinh điển đến cạnh tranh công nghệ 4.0. Mỗi lần cuộn là một lớp tư duy mới: nguồn gốc lợi nhuận, quy luật cạnh tranh, và tác động lan tỏa đến toàn bộ nền kinh tế.</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {QUICK_PULSE.map((item, idx) => (
                    <div key={item.label} className="rounded-2xl border border-white/60 bg-white/80 p-3 shadow-md backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl" style={{ transitionDelay: `${idx * 90}ms` }}>
                      <div className={`mb-2 h-1.5 w-14 rounded-full bg-gradient-to-r ${item.color}`} />
                      <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                      <p className="mt-1 text-sm font-bold text-slate-800">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-auto w-full max-w-sm">
                <div className="relative rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl backdrop-blur transition-transform duration-500 hover:scale-[1.02]">
                  <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-violet-200/30 to-cyan-200/30 blur-xl" />
                  <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border-4 border-violet-200/80 bg-white shadow-inner">
                    <div className="flex h-32 w-32 animate-spin items-center justify-center rounded-full border-2 border-dashed border-violet-400 text-center text-xs font-black text-violet-700" style={{ animationDuration: '10s' }}>CẠNH TRANH</div>
                    <div className="absolute rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1 text-xs font-extrabold text-white">m↑</div>
                  </div>
                  <p className="mt-5 text-center text-sm text-slate-600">Vòng xoáy đổi mới công nghệ liên tục tạo lợi thế tạm thời và tái định hình mặt bằng lợi nhuận.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 lg:grid-cols-[70px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-2">
              {THEORY_SECTIONS.map((section, index) => (
                <button key={section.id} onClick={() => scrollToSection(index)} className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition-all ${activeSection === index ? 'scale-110 border-violet-300 bg-violet-500 text-white shadow-violet-200' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`} title={section.title}>{section.icon}</button>
              ))}
            </div>
          </aside>

          <div>
            <div className="relative mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-500" />
              <p className="ml-2 text-sm text-slate-700"><span className="font-black text-slate-900">Mạch tư duy của bài:</span> lý luận giá trị thặng dư → cơ chế siêu ngạch → động lực 4.0 → tính chất vận động → ví dụ thực tiễn → ý nghĩa chính sách.</p>
            </div>

            {THEORY_SECTIONS.map((section, index) => {
              const visible = visibleSections[section.id]
              const isActive = activeSection === index
              return (
                <section
                  key={section.id}
                  data-section={index}
                  data-sectionid={section.id}
                  className={`relative mb-10 scroll-mt-24 transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  {isActive && (
                    <div className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-r from-violet-300/35 via-fuchsia-300/30 to-cyan-300/35 blur-xl" />
                  )}

                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${section.accent} text-xl text-white shadow-md`}>{section.icon}</div>
                    <h3 className="text-xl font-black text-slate-800 md:text-2xl">{section.title}</h3>
                    {isActive && <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-700">Đang xem</span>}
                  </div>

                  <div className={`rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 md:p-8 ${isActive ? 'border-violet-200 bg-white shadow-2xl shadow-violet-100/70' : 'border-white/60 bg-white/85 shadow-xl shadow-slate-100'}`}>
                    {section.content}
                  </div>
                </section>
              )
            })}

            <section className="rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-center text-white shadow-2xl">
              <p className="text-sm uppercase tracking-[0.2em] text-indigo-100">Kết thúc phần lý thuyết</p>
              <h3 className="mt-2 text-2xl font-black md:text-3xl">Bây giờ chuyển sang chế độ thực chiến</h3>
              <p className="mx-auto mt-3 max-w-2xl text-indigo-100">Kiểm tra khả năng ghi nhớ và phản xạ tư duy bằng trò chơi tương tác.</p>
              <button onClick={() => router.push('/game')} className="mt-6 rounded-2xl bg-white px-8 py-3 text-lg font-black text-violet-700 transition-transform hover:scale-105">BẮT ĐẦU CHƠI</button>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
