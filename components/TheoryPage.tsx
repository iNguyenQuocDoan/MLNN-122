"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface TheorySection {
  id: string;
  title: string;
  icon: string;
  accent: string;
  content: React.ReactNode;
}

const SITE_CONFIG = {
  title: "TỔNG HỢP: GIÁ TRỊ THẶNG DƯ SIÊU NGẠCH TRONG KỶ NGUYÊN 4.0",
  subtitle: "Kinh tế chính trị Mác – Lênin · Chuyên đề tư duy hiện đại",
  logo: "⚙️",
};

const THEORY_SECTIONS: TheorySection[] = [
  {
    id: "foundation",
    title: "1) Nền tảng lý luận về Giá trị thặng dư (m)",
    icon: "🧠",
    accent: "from-indigo-500 to-blue-500",
    content: (
      <div className="space-y-5 text-slate-700 leading-relaxed">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <p>
              Trong kinh tế chính trị Mác – Lênin,{" "}
              <b>giá trị thặng dư (m)</b> là phần giá trị mới do người lao động
              tạo ra vượt lên trên giá trị sức lao động của họ, nhưng bị nhà tư
              bản chiếm đoạt.
            </p>
            <p>
              Tư bản mua sức lao động gọi là <b>tư bản khả biến (v)</b>, vì
              trong sản xuất nó làm tăng giá trị thành <b>v + m</b>. Đây là
              nguồn gốc sâu xa của mọi lợi nhuận TBCN.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
            <div className="text-xs font-black uppercase tracking-wider text-blue-500 mb-3">
              ⚡ Quá trình tạo giá trị
            </div>
            {[
              {
                step: "1",
                label: "Nhà tư bản mua sức lao động",
                sub: "Trả tiền lương = v",
                cls: "bg-indigo-100 text-indigo-700",
              },
              {
                step: "2",
                label: "Người lao động làm việc",
                sub: "Tạo giá trị = v + m",
                cls: "bg-blue-100 text-blue-700",
              },
              {
                step: "3",
                label: "Nhà tư bản chiếm đoạt m",
                sub: "Lợi nhuận = m > 0",
                cls: "bg-violet-100 text-violet-700",
              },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3 mb-2 last:mb-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${s.cls}`}
                >
                  {s.step}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">
                    {s.label}
                  </div>
                  <div className="text-xs text-slate-500">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-blue-200 bg-blue-50">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white flex items-center gap-2">
            <span>📐</span> Công thức lõi — Giá trị hàng hóa
          </div>
          <div className="grid gap-3 p-4 md:grid-cols-3">
            {[
              { sym: "c", name: "Tư bản bất biến", note: "Máy móc, NVL", bg: "bg-indigo-100 text-indigo-700" },
              { sym: "v", name: "Tư bản khả biến", note: "Tiền lương LĐ", bg: "bg-blue-100 text-blue-700" },
              { sym: "m", name: "Giá trị thặng dư", note: "Lợi nhuận gốc", bg: "bg-emerald-100 text-emerald-700" },
            ].map((item) => (
              <div key={item.sym} className="rounded-xl border border-white bg-white p-3 text-center shadow-sm">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-black ${item.bg}`}>
                  {item.sym}
                </div>
                <div className="text-xs font-bold text-slate-700">{item.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{item.note}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-blue-100 px-4 py-3 text-center text-xl font-black text-blue-800 tracking-widest">
            W = c + v + m
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "definition",
    title: "2) Định nghĩa Giá trị thặng dư siêu ngạch",
    icon: "📈",
    accent: "from-fuchsia-500 to-pink-500",
    content: (
      <div className="space-y-5 text-slate-700 leading-relaxed">
        <div className="rounded-2xl border-2 border-fuchsia-200 bg-gradient-to-r from-fuchsia-50 to-pink-50 p-5">
          <div className="flex items-start gap-3">
            <span className="text-3xl shrink-0">💡</span>
            <p className="text-base font-semibold text-fuchsia-900 leading-relaxed">
              <b>Giá trị thặng dư siêu ngạch</b> là phần lợi nhuận vượt trội
              cao hơn mức bình thường của thị trường, đạt được khi doanh nghiệp
              có <b>chi phí sản xuất cá biệt thấp hơn</b> mức trung bình xã hội
              nhờ công nghệ tiên tiến.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border-2 border-rose-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 font-black text-sm">
                ↓
              </span>
              <div className="font-bold text-slate-800">
                Giá trị cá biệt (thấp hơn)
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Chi phí sản xuất của <b>DN tiên tiến</b>, thấp hơn mức trung
              bình nhờ ứng dụng công nghệ ưu việt.
            </p>
            <div className="h-3 rounded-full bg-rose-100 overflow-hidden">
              <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-rose-400 to-rose-500" />
            </div>
            <div className="text-xs text-rose-500 mt-1 font-bold">40% mức trung bình</div>
          </div>
          <div className="rounded-xl border-2 border-blue-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-black text-sm">
                ↑
              </span>
              <div className="font-bold text-slate-800">
                Giá trị xã hội (cao hơn)
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Mức giá thị trường <b>chung của ngành</b> — DN bán theo giá
              này dù chi phí của mình thấp hơn.
            </p>
            <div className="h-3 rounded-full bg-blue-100 overflow-hidden">
              <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-blue-400 to-blue-500" />
            </div>
            <div className="text-xs text-blue-500 mt-1 font-bold">100% mức trung bình</div>
          </div>
        </div>

        <div className="rounded-xl border-l-4 border-fuchsia-400 bg-fuchsia-50 p-4">
          <p className="text-sm text-fuchsia-900 font-medium">
            <b>Kết quả:</b> Chênh lệch giữa giá bán (giá trị xã hội) và chi phí
            (giá trị cá biệt) chính là <b>giá trị thặng dư siêu ngạch</b> — động lực
            cạnh tranh công nghệ mạnh nhất trong CNTB.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "tech40",
    title: "3) Công nghệ 4.0: Động lực tạo thặng dư siêu ngạch",
    icon: "🤖",
    accent: "from-cyan-500 to-emerald-500",
    content: (
      <div className="space-y-5 text-slate-700 leading-relaxed">
        <p>
          Cách mạng Công nghiệp 4.0 tạo ra các công cụ mạnh mẽ giúp doanh
          nghiệp kéo chi phí cá biệt xuống thấp hơn nhiều so với đối thủ
          truyền thống, tạo ra siêu ngạch khổng lồ.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "🤖",
              title: "AI & ML",
              desc: "Tự động hóa quyết định, dự báo nhu cầu, tối ưu quy trình sản xuất 24/7 không ngừng nghỉ.",
              headerCls: "bg-cyan-600",
              borderCls: "border-cyan-200 bg-cyan-50",
            },
            {
              icon: "📊",
              title: "Big Data",
              desc: "Phân tích hàng tỷ điểm dữ liệu để giảm lãng phí, rủi ro tồn kho và chi phí vận hành.",
              headerCls: "bg-emerald-600",
              borderCls: "border-emerald-200 bg-emerald-50",
            },
            {
              icon: "🌐",
              title: "IoT",
              desc: "Kết nối máy móc thông minh, giám sát thời gian thực, bảo trì dự đoán trước hỏng hóc.",
              headerCls: "bg-teal-600",
              borderCls: "border-teal-200 bg-teal-50",
            },
            {
              icon: "⚙️",
              title: "Robot tự động",
              desc: "Thay thế lao động thủ công lặp đi lặp lại, tăng tốc và đồng đều hóa chất lượng sản xuất.",
              headerCls: "bg-green-600",
              borderCls: "border-green-200 bg-green-50",
            },
          ].map((t) => (
            <div
              key={t.title}
              className={`rounded-xl border overflow-hidden shadow-sm hover:-translate-y-1 transition-transform ${t.borderCls}`}
            >
              <div className={`${t.headerCls} px-3 py-2 text-white text-xs font-bold flex items-center gap-1.5`}>
                <span>{t.icon}</span> {t.title}
              </div>
              <p className="p-3 text-xs text-slate-600 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4 flex items-start gap-3">
            <span className="text-2xl shrink-0">📉</span>
            <div>
              <div className="font-bold text-emerald-800 mb-1">
                Chi phí cá biệt giảm mạnh
              </div>
              <div className="text-sm text-emerald-700">
                Tối ưu thời gian, nguyên liệu, nhân lực, logistics nhờ AI +
                Lean + Just-in-time đồng bộ.
              </div>
            </div>
          </div>
          <div className="rounded-xl border-2 border-cyan-200 bg-cyan-50 p-4 flex items-start gap-3">
            <span className="text-2xl shrink-0">📈</span>
            <div>
              <div className="font-bold text-cyan-800 mb-1">
                Biên lợi nhuận tăng vượt trội
              </div>
              <div className="text-sm text-cyan-700">
                Giá bán theo mặt bằng chung, nhưng chênh lệch thu về lớn hơn
                đáng kể so với đối thủ chưa số hóa.
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "properties",
    title: "4) Ba tính chất của Giá trị thặng dư siêu ngạch",
    icon: "🔍",
    accent: "from-amber-500 to-orange-500",
    content: (
      <div className="space-y-4 text-slate-700">
        {[
          {
            num: "01",
            title: "Tạm thời với từng nhà tư bản",
            desc: "Đối thủ bắt chước công nghệ → giá trị xã hội giảm → phần siêu ngạch mất dần. Điều này buộc từng doanh nghiệp phải liên tục đổi mới để giữ lợi thế.",
            borderCls: "border-amber-300 bg-amber-50",
            badgeCls: "bg-amber-500",
            tag: "Cá biệt · Tạm thời",
          },
          {
            num: "02",
            title: "Phổ biến trong toàn xã hội tư bản",
            desc: "Luôn có doanh nghiệp đi trước một bước, tạo \"dây chuyền\" chuyển dịch lợi thế liên tục. Tổng lượng siêu ngạch tồn tại bền vững trong toàn hệ thống.",
            borderCls: "border-orange-300 bg-orange-50",
            badgeCls: "bg-orange-500",
            tag: "Xã hội · Thường xuyên",
          },
          {
            num: "03",
            title: "Biến tướng của thặng dư tương đối",
            desc: "Cùng nguồn gốc từ tăng năng suất, nhưng thặng dư tương đối lan rộng toàn ngành; siêu ngạch chỉ ở cấp độ doanh nghiệp cá biệt đi trước thị trường.",
            borderCls: "border-rose-300 bg-rose-50",
            badgeCls: "bg-rose-500",
            tag: "Nguồn gốc · Năng suất",
          },
        ].map((p) => (
          <div
            key={p.num}
            className={`rounded-xl border-2 p-5 flex items-start gap-4 transition-all hover:shadow-md ${p.borderCls}`}
          >
            <div
              className={`w-10 h-10 rounded-xl ${p.badgeCls} text-white font-black text-sm flex items-center justify-center shrink-0`}
            >
              {p.num}
            </div>
            <div className="flex-1">
              <div className="font-black text-slate-800 mb-1.5 text-base">
                {p.title}
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{p.desc}</p>
              <span className="mt-2 inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-slate-600 border border-slate-200">
                {p.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "examples",
    title: "5) Ví dụ điển hình từ doanh nghiệp thực tế",
    icon: "🏭",
    accent: "from-violet-500 to-purple-500",
    content: (
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            name: "Tesla",
            flag: "🚗",
            headerCls: "from-red-600 to-rose-700",
            borderCls: "border-red-200",
            tech: "Robot tự động · Công nghệ pin · OTA",
            metric: "~30%",
            metricLabel: "biên lợi nhuận gộp",
            desc: "Gigafactory tự động hóa cao, cập nhật phần mềm OTA không cần xưởng dịch vụ — sản xuất nhanh hơn và chi phí thấp hơn hãng truyền thống đến 30%.",
          },
          {
            name: "Amazon",
            flag: "📦",
            headerCls: "from-yellow-500 to-orange-600",
            borderCls: "border-yellow-200",
            tech: "Robot Kiva · AI dự báo · AWS Cloud",
            metric: "750k+",
            metricLabel: "robot kho vận",
            desc: "Hệ thống robot Kiva + AI logistics tối ưu 24/7 giảm 50% thời gian xử lý đơn, hạ mạnh chi phí vận hành cá biệt so với nhà bán lẻ truyền thống.",
          },
          {
            name: "Viettel",
            flag: "📡",
            headerCls: "from-red-700 to-red-900",
            borderCls: "border-red-200",
            tech: "AI NetMind · Big Data · 5G",
            metric: "131,7 tỷ",
            metricLabel: "đồng tiết kiệm",
            desc: "NetMind AI giảm 30% chi phí đầu tư hạ tầng mạng, tạo lợi nhuận vượt trội so với các nhà mạng chưa ứng dụng trí tuệ nhân tạo.",
          },
        ].map((c) => (
          <article
            key={c.name}
            className={`rounded-2xl border-2 overflow-hidden shadow-md hover:-translate-y-1.5 transition-transform duration-300 ${c.borderCls}`}
          >
            <div
              className={`bg-gradient-to-r ${c.headerCls} px-4 py-3 flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{c.flag}</span>
                <h4 className="font-black text-white text-lg">{c.name}</h4>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-white">{c.metric}</div>
                <div className="text-[10px] text-white/70">{c.metricLabel}</div>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <span>⚙️</span> {c.tech}
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{c.desc}</p>
            </div>
          </article>
        ))}
      </div>
    ),
  },
  {
    id: "meaning",
    title: "6) Ý nghĩa đối với nền kinh tế",
    icon: "🌍",
    accent: "from-teal-500 to-lime-500",
    content: (
      <div className="space-y-4 text-slate-700">
        <p className="text-slate-600 leading-relaxed">
          Giá trị thặng dư siêu ngạch không chỉ là lợi ích cá biệt của từng
          doanh nghiệp — nó lan tỏa tác động sâu rộng đến toàn bộ nền kinh tế
          và xã hội:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: "🔬",
              title: "Thúc đẩy đổi mới liên tục",
              desc: "Tạo áp lực đầu tư R&D không ngừng. DN ngừng đổi mới sẽ mất lợi thế và bị đào thải.",
              cls: "border-teal-300 bg-teal-50 text-teal-900",
            },
            {
              icon: "⚡",
              title: "Tăng năng suất lao động xã hội",
              desc: "Công nghệ tiên tiến dần trở thành chuẩn ngành, sản xuất nhiều hơn trong cùng thời gian.",
              cls: "border-emerald-300 bg-emerald-50 text-emerald-900",
            },
            {
              icon: "💰",
              title: "Hạ giá thành hàng hóa dài hạn",
              desc: "Người tiêu dùng hưởng lợi khi công nghệ phổ biến, giá hàng hóa giảm theo giá trị xã hội mới.",
              cls: "border-green-300 bg-green-50 text-green-900",
            },
            {
              icon: "⚖️",
              title: "Đòi hỏi chính sách điều tiết",
              desc: "Hỗ trợ DN vừa & nhỏ, đào tạo lại lao động dôi dư, tránh tập trung quyền lực kinh tế quá mức.",
              cls: "border-lime-300 bg-lime-50 text-lime-900",
            },
          ].map((m) => (
            <div
              key={m.title}
              className={`rounded-xl border-2 p-4 flex items-start gap-3 hover:shadow-sm transition-all ${m.cls}`}
            >
              <span className="text-2xl shrink-0">{m.icon}</span>
              <div>
                <div className="font-black text-sm mb-1">{m.title}</div>
                <p className="text-xs leading-relaxed opacity-80">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const HERO_STATS = [
  { num: "6", label: "Phần lý thuyết", icon: "📚", color: "text-violet-600" },
  { num: "30", label: "Câu hỏi thực chiến", icon: "❓", color: "text-blue-600" },
  { num: "30", label: "Bước đua kho báu", icon: "🏆", color: "text-amber-600" },
];

const QUICK_PULSE = [
  {
    label: "Lõi lý luận",
    value: "W = c + v + m",
    color: "from-blue-500 to-indigo-500",
    icon: "📐",
  },
  {
    label: "Động lực 4.0",
    value: "AI · IoT · Big Data",
    color: "from-cyan-500 to-emerald-500",
    icon: "🤖",
  },
  {
    label: "Mục tiêu cạnh tranh",
    value: "Chi phí cá biệt thấp hơn",
    color: "from-fuchsia-500 to-rose-500",
    icon: "🎯",
  },
];

export default function TheoryPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroOffset, setHeroOffset] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const progress = scrollTop / (scrollHeight - clientHeight);
      setScrollProgress(Math.min(progress * 100, 100));
      setHeroOffset(scrollTop * 0.15);

      const sections = container.querySelectorAll("[data-section]");
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        if (rect.top <= containerRect.top + 180) setActiveSection(index);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.sectionid;
          if (id && entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { root: container, threshold: 0.15 },
    );

    const watchTargets = container.querySelectorAll("[data-sectionid]");
    watchTargets.forEach((el) => observer.observe(el));

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const section = container.querySelector(`[data-section="${index}"]`);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_20%_10%,_#e9d5ff_0%,_#dbeafe_25%,_#f8fafc_60%,_#ffffff_100%)]">
      {/* Progress bar */}
      <div className="fixed left-0 right-0 top-0 z-50 h-1.5 bg-slate-200/70">
        <div
          className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/40 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-200">
              <span className="absolute inset-0 animate-ping rounded-xl bg-violet-400/25" />
              <span className="relative text-lg">{SITE_CONFIG.logo}</span>
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-wide text-slate-900 md:text-base">
                MLN122 · Kinh tế chính trị
              </h1>
              <p className="text-xs text-slate-500">{SITE_CONFIG.subtitle}</p>
            </div>
          </div>

          <button
            onClick={() => router.push("/game")}
            className="rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-orange-200 transition-all hover:scale-105 hover:shadow-orange-300 active:scale-95"
          >
            🎮 Vào game ngay →
          </button>
        </div>
      </header>

      <div ref={containerRef} className="flex-1 overflow-y-auto scroll-smooth">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pb-12 pt-10 md:pb-16 md:pt-14">
          <div
            className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-fuchsia-300/35 blur-3xl"
            style={{ transform: `translateY(${heroOffset * 0.6}px)` }}
          />
          <div
            className="absolute right-0 top-6 h-72 w-72 rounded-full bg-cyan-300/35 blur-3xl"
            style={{ transform: `translateY(${heroOffset * -0.4}px)` }}
          />
          <div
            className="absolute bottom-0 left-1/2 h-48 w-96 rounded-full bg-violet-200/30 blur-3xl"
            style={{ transform: `translateX(-50%) translateY(${heroOffset * 0.3}px)` }}
          />

          <div className="relative mx-auto max-w-6xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                  Chuyên đề cinematic · Không phải slide truyền thống
                </p>
                <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 md:text-5xl">
                  {SITE_CONFIG.title}
                </h2>
                <p className="mt-4 max-w-2xl text-slate-600 md:text-lg leading-relaxed">
                  Từ lý luận kinh điển đến cạnh tranh công nghệ 4.0. Mỗi lần
                  cuộn là một lớp tư duy mới: nguồn gốc lợi nhuận, quy luật
                  cạnh tranh, và tác động lan tỏa đến toàn bộ nền kinh tế.
                </p>

                {/* Stats row */}
                <div className="mt-5 flex items-center gap-4 flex-wrap">
                  {HERO_STATS.map((s) => (
                    <div key={s.num} className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/80 px-4 py-2.5 shadow-md backdrop-blur-sm">
                      <span className="text-xl">{s.icon}</span>
                      <div>
                        <div className={`text-2xl font-black ${s.color}`}>{s.num}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold leading-none">{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick pulse cards */}
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {QUICK_PULSE.map((item, idx) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/60 bg-white/80 p-3.5 shadow-md backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                      style={{ transitionDelay: `${idx * 80}ms` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`h-1.5 w-10 rounded-full bg-gradient-to-r ${item.color}`} />
                        <span className="text-base">{item.icon}</span>
                      </div>
                      <p className="text-xs uppercase tracking-wide text-slate-500 font-bold">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-black text-slate-800">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Innovation Cycle Infographic */}
              <div className="mx-auto w-full max-w-xs">
                <div className="relative rounded-3xl border border-white/60 bg-white/75 px-5 py-6 shadow-2xl backdrop-blur transition-transform duration-500 hover:scale-[1.02]">
                  {/* Subtle background bloom */}
                  <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-violet-200/30 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-fuchsia-200/20 blur-2xl pointer-events-none" />

                  {/* Title badge */}
                  <div className="text-center mb-5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 anim-breathe" />
                      <span className="text-[11px] font-black uppercase tracking-[0.18em] text-violet-700">
                        Vòng xoáy đổi mới
                      </span>
                    </span>
                  </div>

                  {/* Orbital diagram — 260×260px, orbit r=90, center=130 */}
                  <div className="relative mx-auto" style={{ width: "260px", height: "260px" }}>

                    {/* SVG: orbit ring + direction arrow */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 260 260" fill="none">
                      <defs>
                        <marker id="arrowViz" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
                          <path d="M 0 1 L 6 3.5 L 0 6 Z" fill="rgba(139,92,246,0.65)" />
                        </marker>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="2" result="blur" />
                          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                      </defs>

                      {/* Main orbit ring r=90 */}
                      <circle cx="130" cy="130" r="90" stroke="rgba(167,139,250,0.35)" strokeWidth="1.5" />

                      {/* Outer decorative ring */}
                      <circle cx="130" cy="130" r="114" stroke="rgba(216,180,254,0.2)" strokeWidth="1" strokeDasharray="3 6" />

                      {/* Thin lines from center to each node */}
                      <line x1="130" y1="108" x2="130" y2="44" stroke="rgba(167,139,250,0.2)" strokeWidth="1" strokeDasharray="3 4" />
                      <line x1="152" y1="130" x2="216" y2="130" stroke="rgba(167,139,250,0.2)" strokeWidth="1" strokeDasharray="3 4" />
                      <line x1="130" y1="152" x2="130" y2="216" stroke="rgba(167,139,250,0.2)" strokeWidth="1" strokeDasharray="3 4" />
                      <line x1="108" y1="130" x2="44" y2="130" stroke="rgba(167,139,250,0.2)" strokeWidth="1" strokeDasharray="3 4" />

                      {/* Clockwise arc with arrow */}
                      <path d="M 173 46 A 90 90 0 0 1 214 173"
                        stroke="rgba(139,92,246,0.55)" strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        markerEnd="url(#arrowViz)"
                        filter="url(#glow)"
                      />
                    </svg>

                    {/* Slowly traveling glow dot on orbit */}
                    <div className="absolute rounded-full" style={{ inset: "40px", animation: "spinSlow 22s linear infinite" }}>
                      <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
                        style={{ background: "radial-gradient(circle, #a78bfa 0%, #7c3aed 60%)", boxShadow: "0 0 10px rgba(167,139,250,0.9), 0 0 20px rgba(139,92,246,0.5)" }}
                      />
                    </div>

                    {/* ── Center Core ── */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-[82px] h-[82px] rounded-full flex flex-col items-center justify-center text-white shadow-xl"
                        style={{ background: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 45%, #9333ea 100%)", boxShadow: "0 8px 32px rgba(109,40,217,0.5), 0 0 0 4px rgba(167,139,250,0.15)" }}>
                        <span className="text-[22px] font-black leading-none">m↑</span>
                        <span className="text-[7px] font-bold tracking-[0.12em] mt-0.5 opacity-75 uppercase">siêu ngạch</span>
                        <div className="absolute inset-[-6px] rounded-full border-2 border-violet-300/40 anim-breathe pointer-events-none" />
                      </div>
                    </div>

                    {/* ── Node 1: TOP — center.y - r = 130-90=40, icon center → top=20 */}
                    <div className="absolute flex flex-col items-center gap-1" style={{ top: "0px", left: "50%", transform: "translateX(-50%)" }}>
                      <div className="w-10 h-10 rounded-2xl bg-white border-2 border-violet-300 shadow-lg flex items-center justify-center text-lg"
                        style={{ boxShadow: "0 4px 12px rgba(139,92,246,0.2)" }}>
                        🔬
                      </div>
                      <span className="text-[10px] font-black text-violet-800 whitespace-nowrap bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-violet-100 shadow-sm">
                        Đổi mới CN
                      </span>
                    </div>

                    {/* ── Node 2: RIGHT — center.x + r = 130+90=220, icon at right edge */}
                    <div className="absolute flex flex-col items-center gap-1" style={{ top: "50%", right: "0px", transform: "translateY(-50%)" }}>
                      <div className="w-10 h-10 rounded-2xl bg-white border-2 border-emerald-300 shadow-lg flex items-center justify-center text-lg"
                        style={{ boxShadow: "0 4px 12px rgba(16,185,129,0.2)" }}>
                        📉
                      </div>
                      <span className="text-[10px] font-black text-emerald-700 whitespace-nowrap bg-white/90 px-2 py-0.5 rounded-full border border-emerald-100 shadow-sm">
                        Chi phí↓
                      </span>
                    </div>

                    {/* ── Node 3: BOTTOM */}
                    <div className="absolute flex flex-col items-center gap-1" style={{ bottom: "0px", left: "50%", transform: "translateX(-50%)" }}>
                      <span className="text-[10px] font-black text-orange-700 whitespace-nowrap bg-white/90 px-2 py-0.5 rounded-full border border-orange-100 shadow-sm">
                        Lan rộng
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-white border-2 border-orange-300 shadow-lg flex items-center justify-center text-lg"
                        style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.2)" }}>
                        🔄
                      </div>
                    </div>

                    {/* ── Node 4: LEFT */}
                    <div className="absolute flex flex-col items-center gap-1" style={{ top: "50%", left: "0px", transform: "translateY(-50%)" }}>
                      <div className="w-10 h-10 rounded-2xl bg-white border-2 border-amber-300 shadow-lg flex items-center justify-center text-lg"
                        style={{ boxShadow: "0 4px 12px rgba(245,158,11,0.2)" }}>
                        💰
                      </div>
                      <span className="text-[10px] font-black text-amber-700 whitespace-nowrap bg-white/90 px-2 py-0.5 rounded-full border border-amber-100 shadow-sm">
                        Lợi nhuận↑
                      </span>
                    </div>
                  </div>

                  {/* Footer description */}
                  <p className="mt-5 text-center text-xs text-slate-500 leading-relaxed px-2">
                    Vòng xoáy liên tục tạo lợi thế tạm thời, tái định hình<br />
                    mặt bằng lợi nhuận — động lực đổi mới không ngừng.
                  </p>

                  {/* Mini cycle labels */}
                  <div className="mt-3 grid grid-cols-2 gap-1.5">
                    {[
                      { icon: "🔬", label: "Đổi mới CN", color: "text-violet-600 bg-violet-50 border-violet-100" },
                      { icon: "📉", label: "Chi phí cá biệt↓", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                      { icon: "💰", label: "Siêu ngạch xuất hiện", color: "text-amber-600 bg-amber-50 border-amber-100" },
                      { icon: "🔄", label: "Đối thủ bắt chước", color: "text-orange-600 bg-orange-50 border-orange-100" },
                    ].map((item) => (
                      <div key={item.label} className={`flex items-center gap-1.5 rounded-xl px-2 py-1.5 border text-[10px] font-bold ${item.color}`}>
                        <span>{item.icon}</span>
                        <span className="leading-tight">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <main className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 lg:grid-cols-[80px_1fr]">
          {/* Sidebar nav */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-2">
              {THEORY_SECTIONS.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-sm transition-all text-lg ${
                    activeSection === index
                      ? "scale-110 border-violet-300 bg-violet-500 text-white shadow-violet-200 shadow-md"
                      : "border-slate-200 bg-white text-slate-500 hover:border-violet-300 hover:scale-105"
                  }`}
                  title={section.title}
                >
                  {section.icon}
                </button>
              ))}
              <div className="w-12 h-px bg-slate-200 mx-auto mt-4" />
              <button
                onClick={() => router.push("/game")}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-orange-200 bg-orange-50 text-lg hover:bg-orange-500 hover:text-white hover:scale-110 transition-all shadow-sm"
                title="Vào game"
              >
                🎮
              </button>
            </div>
          </aside>

          <div>
            {/* "Mạch tư duy" intro */}
            <div className="relative mb-10 overflow-hidden rounded-2xl border border-violet-100 bg-white p-5 shadow-md">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-500 rounded-l-2xl" />
              <div className="ml-4">
                <div className="text-xs font-black uppercase tracking-wider text-violet-600 mb-2">
                  📋 Mạch tư duy của bài
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                  {[
                    { step: "Lý luận m", icon: "🧠" },
                    { step: "Siêu ngạch", icon: "📈" },
                    { step: "Động lực 4.0", icon: "🤖" },
                    { step: "Tính chất", icon: "🔍" },
                    { step: "Ví dụ thực tế", icon: "🏭" },
                    { step: "Ý nghĩa", icon: "🌍" },
                  ].map((s, i, arr) => (
                    <span key={s.step} className="flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold border cursor-pointer transition-colors hover:bg-violet-50 ${
                          activeSection === i
                            ? "bg-violet-100 border-violet-300 text-violet-700"
                            : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}
                        onClick={() => scrollToSection(i)}
                      >
                        {s.icon} {s.step}
                      </span>
                      {i < arr.length - 1 && (
                        <span className="text-slate-300 font-light">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sections */}
            {THEORY_SECTIONS.map((section, index) => {
              const visible = visibleSections[section.id];
              const isActive = activeSection === index;
              return (
                <section
                  key={section.id}
                  data-section={index}
                  data-sectionid={section.id}
                  className={`relative mb-10 scroll-mt-24 transition-all duration-700 ${
                    visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  {isActive && (
                    <div className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-r from-violet-300/30 via-fuchsia-300/25 to-cyan-300/30 blur-xl" />
                  )}

                  {/* Section header */}
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${section.accent} text-xl text-white shadow-md shadow-black/10`}
                    >
                      {section.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-black text-slate-800 md:text-2xl leading-tight">
                        {section.title}
                      </h3>
                    </div>
                    {isActive && (
                      <span className="shrink-0 rounded-full bg-violet-100 border border-violet-200 px-2.5 py-0.5 text-xs font-bold text-violet-700">
                        Đang xem
                      </span>
                    )}
                  </div>

                  {/* Section content card */}
                  <div
                    className={`rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 md:p-8 ${
                      isActive
                        ? "border-violet-200 bg-white shadow-2xl shadow-violet-100/60"
                        : "border-white/60 bg-white/85 shadow-xl shadow-slate-100"
                    }`}
                  >
                    {section.content}
                  </div>
                </section>
              );
            })}

            {/* Final CTA */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-10 text-center text-white shadow-2xl">
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: "repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.05) 5deg, transparent 10deg)",
                  animation: "spinSlow 30s linear infinite",
                }}
              />
              <div className="relative">
                <div className="text-5xl mb-4">🏆</div>
                <p className="text-sm uppercase tracking-[0.2em] text-indigo-200 font-bold mb-2">
                  Kết thúc phần lý thuyết
                </p>
                <h3 className="text-2xl font-black md:text-3xl mb-3">
                  Bây giờ chuyển sang chế độ thực chiến!
                </h3>
                <p className="mx-auto mt-2 max-w-2xl text-indigo-100 text-base">
                  Kiểm tra khả năng ghi nhớ và phản xạ tư duy bằng trò chơi
                  Truy Tìm Kho Báu tương tác — <b>30 câu hỏi, 15 phần quà bất
                  ngờ, 30 bước đến đích!</b>
                </p>
                <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
                  <button
                    onClick={() => router.push("/game")}
                    className="rounded-2xl bg-white px-8 py-4 text-lg font-black text-violet-700 transition-all hover:scale-105 hover:shadow-xl shadow-lg"
                  >
                    🚀 BẮT ĐẦU CHƠI NGAY!
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-6 text-sm text-indigo-200">
                  <span>✅ 30 câu hỏi</span>
                  <span>🎁 15 phần quà</span>
                  <span>👥 2–6 người chơi</span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
