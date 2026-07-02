export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navydeep py-16 text-white">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-12 px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <a href="/#hero" aria-label="SOCODECO — home" className="block transition-opacity hover:opacity-80">
            <p className="font-display text-3xl font-bold tracking-tightest">SOCODECO</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/35">
              Société de Construction et de Développement du Congo
            </p>
          </a>
          <nav className="flex flex-wrap gap-x-9 gap-y-3 text-[13.5px] text-white/55">
            <a href="/about.html" className="transition-colors hover:text-gold">Our Story</a>
            <a href="/#services" className="transition-colors hover:text-gold">Expertise</a>
            <a href="/#projects" className="transition-colors hover:text-gold">Projects</a>
            <a href="/#quality" className="transition-colors hover:text-gold">Quality</a>
            <a href="#contact" className="transition-colors hover:text-gold">Contact</a>
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-8 text-[12.5px] text-white/30 md:flex-row">
          <p>© {new Date().getFullYear()} SOCODECO. All rights reserved.</p>
          <p>+243 990 000 027 · Kinshasa · République Démocratique du Congo</p>
        </div>
      </div>
    </footer>
  );
}
