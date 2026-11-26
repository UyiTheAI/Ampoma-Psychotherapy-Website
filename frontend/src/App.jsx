import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { siteContent as fallbackContent } from '../../shared/site-content.js';

const therapyApproaches = [
  'Person-Centered Therapy',
  'Cognitive Behavioural Therapy',
  'Strengths-Based Therapy',
  'Emotion-Focused Therapy',
  'Solution-Focused Therapy',
  'Narrative Therapy',

];

function SiteHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [content, setContent] = useState(fallbackContent);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [contactNotice, setContactNotice] = useState('');

  const loadContent = async () => {
    if (import.meta.env.PROD) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/site-content');
      if (!response.ok) {
        throw new Error(`Site content request failed (${response.status})`);
      }
      setContent(await response.json());
      setHasError(false);
    } catch {
      setContent(fallbackContent);
      setHasError(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!import.meta.env.PROD) void loadContent();
  }, []);

  useEffect(() => {
    if (!content) return;
    document.title = `${content.businessName} | Virtual Psychotherapy in Ontario`;
    const description =
      'Affordable, low-cost virtual psychotherapy across Ontario with Esther Amoako Ampoma. Book a free 15-minute consultation.';
    const setMeta = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', `${content.businessName} — ${content.serviceLine}`);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', 'website');
  }, [content]);

  if (isLoading) {
    return (
      <main className="min-h-[100dvh] bg-[#f5f2e9] px-6 py-8" aria-label="Loading Ampoma Psychotherapy">
        <div className="mx-auto max-w-6xl">
          <div className="h-8 w-52 animate-pulse rounded bg-[#e4e2d8]" />
          <div className="mt-20 max-w-3xl">
            <div className="space-y-5">
              <div className="h-3 w-40 animate-pulse rounded bg-[#e4e2d8]" />
              <div className="h-16 w-full animate-pulse rounded bg-[#e4e2d8]" />
              <div className="h-16 w-4/5 animate-pulse rounded bg-[#e4e2d8]" />
              <div className="h-24 w-full animate-pulse rounded bg-[#e4e2d8]" />
              <div className="h-12 w-48 animate-pulse rounded-full bg-[#e4e2d8]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (hasError || !content) {
    return (
      <main className="grid min-h-[100dvh] place-items-center bg-[#f5f2e9] px-6">
        <section className="max-w-lg text-center" aria-live="polite">
          <span className="eyebrow text-[#49715e]">Ampoma Psychotherapy</span>
          <h1 className="display mt-5 text-4xl text-[#234638]">A moment, please.</h1>
          <p className="mt-4 leading-7 text-[#5f6d62]">
            We couldn’t load the practice details just now. Please try again in a little while.
          </p>
          <button
            type="button"
            onClick={() => void loadContent()}
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#285542] px-6 text-sm font-semibold text-[#fbf8ef] transition hover:bg-[#1e4334] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#285542]"
            data-testid="button-retry-content"
          >
            Try again <ArrowRight size={16} aria-hidden="true" />
          </button>
        </section>
      </main>
    );
  }

  const emailLink = `mailto:${content.email}?subject=${encodeURIComponent('Free 15-minute consultation — Ampoma Psychotherapy')}`;
  const consultationUrl = 'https://my.practicebetter.io/#/6b033051f11535c847863ad6/bookings';

  return (
    <div className="site-shell min-h-[100dvh] bg-[#f7f5ee] text-[#243d32]">
      <a
        href="#main-content"
        className="sr-only z-50 rounded bg-[#285542] px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        data-testid="link-skip-content"
      >
        Skip to content
      </a>
      

      <header className="sticky top-0 z-40 border-b border-[#e6e1d5] bg-[#f7f5ee]/95 shadow-[0_8px_24px_rgba(35,48,39,0.04)] backdrop-blur">
        <nav className="page-wrap flex min-h-[78px] items-center justify-between" aria-label="Main navigation">
          <a href="#top" className="group flex items-center gap-3" data-testid="link-home">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#9bb5a6] text-sm font-semibold text-[#285542] transition group-hover:bg-[#d9ece5]">AP</span>
            <span className="min-w-0 leading-tight">
              <span className="block break-words font-semibold tracking-[-.03em] text-[#234638]">{content.businessName}</span>
              <span className="block break-words font-semibold tracking-[-.03em] text-[#234638]">Psychotherapy</span>
            </span>
          </a>

          <div className="hidden items-center gap-9 text-[13px] font-medium text-[#55665a] lg:flex">
            <a className="nav-link" href="#services" data-testid="link-nav-approach">Services</a>
            <a className="nav-link" href="#concerns" data-testid="link-nav-concerns">Challenges</a>
            <a className="nav-link" href="#about" data-testid="link-nav-esther">About Esther</a>
            <a className="nav-link" href="#contact" data-testid="link-nav-contact">Contact</a>
          </div>
          <a href={consultationUrl} target="_blank" rel="noreferrer" className="hidden min-h-11 items-center gap-2 rounded-full bg-[#285542] px-5 text-[12px] font-semibold text-[#fbf8ef] transition hover:-translate-y-0.5 hover:bg-[#1d4433] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#285542] lg:inline-flex" data-testid="link-nav-consultation">
            {content.consultationLabel} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-[#d4d9ce] text-[#285542] transition hover:border-[#285542] hover:bg-[#d9ece5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285542] lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>
        {menuOpen && (
          <div id="mobile-navigation" className="page-wrap flex flex-col gap-1 border-t border-[#e6e1d5] pb-5 pt-3 lg:hidden">
            <a onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm transition hover:bg-[#e9eee6] hover:text-[#285542] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#285542]" href="#services" data-testid="link-mobile-approach">Services</a>
            <a onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm transition hover:bg-[#e9eee6] hover:text-[#285542] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#285542]" href="#concerns" data-testid="link-mobile-concerns">Challenges</a>
            <a onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm transition hover:bg-[#e9eee6] hover:text-[#285542] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#285542]" href="#about" data-testid="link-mobile-esther">About Esther</a>
            <a onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm transition hover:bg-[#e9eee6] hover:text-[#285542] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#285542]" href="#contact" data-testid="link-mobile-contact">Contact</a>
            <a onClick={() => setMenuOpen(false)} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#285542] px-5 text-sm font-semibold text-[#fbf8ef] transition hover:bg-[#1d4433] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285542]" href={consultationUrl} data-testid="link-mobile-consultation">{content.consultationLabel} <ArrowUpRight size={15} /></a>
          </div>
        )}
      </header>

      <main id="main-content">
        <section id="top" className="hero-section">
          <div className="page-wrap hero-inner">
          <div className="hero-copy">
            <p className="eyebrow reveal flex items-center gap-3 text-[#557662]">
              <span className="h-px w-8 bg-[#bd765c]" /> Virtual individual psychotherapy
            </p>
            <h1 className="display reveal reveal-delay mt-5 max-w-5xl text-left text-[clamp(2.8rem,5.2vw,4.75rem)] leading-[.99] text-[#244b3a]" data-testid="text-hero-title">
              {content.heroTitle}
            </h1>
            <div className="hero-description reveal reveal-delay-2 mt-5 grid max-w-5xl gap-x-8 gap-y-4 text-base leading-7 text-[#536457] sm:text-[17px] sm:leading-[1.75] lg:grid-cols-2 lg:text-[15px] lg:leading-6" data-testid="text-hero-description">
              {content.heroDescription.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'lg:row-span-2' : undefined}>{paragraph}</p>
              ))}
            </div>
            <div className="reveal reveal-delay-2 mt-6 flex flex-wrap items-center gap-4">
              <a href={consultationUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center gap-3 rounded-full bg-[#285542] px-6 py-3 text-[13px] font-semibold text-[#fbf8ef] transition hover:-translate-y-0.5 hover:bg-[#1d4433] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#285542]" data-testid="link-hero-consultation">
                {content.consultationLabel} <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href="#services" className="inline-flex min-h-12 items-center gap-2 px-3 text-[13px] font-semibold text-[#46634f] hover:text-[#1d4433]" data-testid="link-hero-learn">
                Explore services <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#e1dfd4] pt-4 text-[12px] text-[#536457]">
              <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#bd765c]" /> Low-cost sessions</span>
              <span className="h-3 w-px bg-[#d2d7cb]" aria-hidden="true" />
              <span>{content.locationNote}</span>
            </div>
          </div>
          </div>
        </section>

        <section className="bg-[#d9ece5] py-7 sm:py-8">
          <div className="page-wrap grid gap-6 sm:grid-cols-3 sm:items-center sm:gap-8">
            <div className="flex items-center gap-4">
              <span className="display text-[30px] text-[#bd765c]">01</span>
              <div><p className="text-sm font-semibold text-[#285542]">Virtual</p><p className="mt-1 text-xs text-[#65796a]">Individual psychotherapy</p></div>
            </div>
            <div className="flex items-center gap-4 border-[#bcd4c8] sm:border-l sm:pl-8">
              <span className="display text-[30px] text-[#bd765c]">02</span>
              <div><p className="text-sm font-semibold text-[#285542]">Across Ontario</p><p className="mt-1 text-xs text-[#65796a]">{content.locationNote}</p></div>
            </div>
            <div className="flex items-center gap-4 border-[#bcd4c8] sm:border-l sm:pl-8">
              <span className="display text-[30px] text-[#bd765c]">03</span>
              <div><p className="text-sm font-semibold text-[#285542]">Free 15-minute consultation</p><p className="mt-1 text-xs text-[#65796a]">A first conversation by email</p></div>
            </div>
          </div>
        </section>

        <section id="services" className="page-wrap grid gap-10 py-20 sm:py-28 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="eyebrow text-[#8b715f]">Services</p>
            <h2 className="display mt-5 max-w-sm text-4xl leading-[1.12] text-[#244b3a] sm:text-5xl">Individual Therapy Taliored For Your Needs</h2>
          </div>
          <div className="lg:pt-2">
            <p className="max-w-[650px] text-[17px] leading-[1.85] text-[#56675a]" data-testid="text-practice-service">
              Individual therapy sessions provide a safe space for individuals to reflect on their challenges, understand the roots of their problems, challenge their maladaptive patterns and work towards their personal goals for a happier and healthier life. 
            <p className="mt-5 max-w-[650px] text-sm leading-7 text-[#68766a]">
              Sessions focus on processing past and present experiences, breaking down problematic thinking and cognitive distortions, reflecting and regulating emotions, building adaptive coping skills, and promoting healthier responses and behaviours.
            </p>
            </p>
            <div className="mt-8 border-t border-[#deded3] pt-7">
              <p className="eyebrow text-[10px] text-[#78907e]">Integrated approaches</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2" data-testid="list-therapy-approaches">
                {therapyApproaches.map((approach) => (
                  <li key={approach} className="flex items-center gap-3 text-sm text-[#4f6354]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#bd765c]" />
                    {approach}
                  </li>
                ))}
              </ul>
            </div>
            <a href={emailLink} className="mt-8 inline-flex items-center gap-2 border-b border-[#285542] pb-1 text-sm font-semibold text-[#285542] hover:text-[#bd765c]" data-testid="link-practice-email">
              Ask about a free 15-minute consultation <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="concerns" className="bg-[#eeeae0] py-20 sm:py-24">
          <div className="page-wrap">
            <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
              <div>
                <p className="eyebrow text-[#8b715f]">What brings you here</p>
                <h2 className="display mt-5 max-w-lg text-4xl leading-[1.1] text-[#244b3a] sm:text-5xl">There’s room for what you’re carrying</h2>
              </div>
              <p className="max-w-[410px] pb-1 text-sm leading-7 text-[#68766a] lg:justify-self-end">
                You might recognize yourself in one of these concerns, or in several. This is a starting point for a conversation.
              </p>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3" data-testid="list-supported-concerns">
              {content.concerns.map((concern, index) => (
                <li key={concern} className="flex min-h-[67px] items-center gap-4 border-t border-[#d8d7ca] py-4 text-[15px] text-[#3f5a48]" data-testid={`text-concern-${index}`}>
                  <span className="display text-lg italic text-[#bd765c]">{String(index + 1).padStart(2, '0')}</span>
                  <span>{concern}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about" className="page-wrap py-20 sm:py-28">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow text-[#8b715f]">Meet your therapist</p>
              <h2 className="display mt-5 text-4xl leading-[1.08] text-[#244b3a] sm:text-5xl" data-testid="text-therapist-name">{content.therapist}</h2>
              <figure className="mt-8 max-w-[360px]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-[#d5ded3] bg-[#e4eee7]">
                  <img
                    src="/images/esther-profile-placeholder.jpg"
                    alt="Esther Amoako Ampoma’s profile photo"
                    className="h-full w-full object-cover"
                    data-testid="img-therapist-placeholder"
                  />
                  
                </div>
              </figure>
            </div>
            <div className="mt-2 min-w-0 lg:mt-0 lg:py-3">
              <div className="max-w-[700px] space-y-5 text-[15px] leading-[1.85] text-[#647166]">
                <p>
                  Esther Amoako Ampoma is a Registered Psychotherapist (Qualifying) with the College of Registered Psychotherapists of Ontario. Esther obtained her Master of Arts in Counselling Psychology degree with honours from Yorkville University. She previously obtained an Honours Bachelor of Science degree from the University of Toronto (St. George), where she specialized in the study of Psychology. Esther has years of experience working in various community and healthcare settings where she supported individuals struggling with complex physical and psychological challenges including mental illness, addiction, chronic pain, and cancer.
                </p>
                <p>
                  Through her experiences and education, Esther is motivated to hear people’s life experiences and help them overcome their psychological challenges in order to live meaningful and fulfilling lives. She approaches each client with patience, compassion, and curiosity. Esther provides corrective emotional experiences for her clients, equips them with healthy coping tools and empowers them to meet their goals.
                </p>
                <p>
                  Esther believes psychotherapy should be accessible to people from all socioeconomic backgrounds and she is determined to provide affordable services. Esther engages in regular supervision with highly experienced registered psychotherapists to ensure she is providing the utmost care to all her clients.
                </p>
                <p>
                  Esther is a Black Ghanaian-Canadian woman living in Ontario. She was born in Ghana and immigrated to Canada as a child. Esther’s cultural identities and experiences motivates a culturally-responsive approach that is sensitive to differences in beliefs, values and lifestyles. She welcomes clients from all cultural backgrounds with respect, curiosity and openness. In sessions, Esther always ensures her clients feel heard, understood and supported.
                </p>
              </div>
              <div className="mt-9 border-t border-[#deded3] pt-6">
                <p className="eyebrow text-[10px] text-[#78907e]">Education & registration</p>
                <ul className="mt-4 space-y-3">
                  {content.credentials.map((credential, index) => (
                    <li key={credential} className="flex gap-3 text-sm leading-6 text-[#4f6354]" data-testid={`text-credential-${index}`}>
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#bd765c]" />
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#eeeae0] py-12 sm:py-16 lg:py-20">
          <div className="page-wrap">
            <div className="grid overflow-hidden rounded-[1.5rem] shadow-[0_22px_70px_rgba(35,48,39,0.12)] lg:min-h-[520px] lg:grid-cols-[.78fr_1.22fr]">
              <div className="relative flex min-w-0 flex-col justify-between overflow-hidden bg-[#1e4334] px-7 py-10 text-[#f7f5ee] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full border border-[#ffffff17]" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full border border-[#ffffff17]" aria-hidden="true" />
                <div className="relative">
                  <p className="eyebrow text-[#efbd31]">Contact</p>
                  <h2 className="mt-5 max-w-md font-sans text-[clamp(2.7rem,6vw,4.4rem)] font-extrabold uppercase leading-[.94] tracking-[-.065em] text-[#fffdf8]" data-testid="text-contact-title">
                    Get in touch
                  </h2>
                  <p className="mt-6 max-w-sm text-sm leading-7 text-[#c9cbc3]">
                Have a question, or want to ask about a free 15-minute consultation or first session? Send Esther a note.
                  </p>
                </div>
                <div className="relative mt-10 border-t border-[#ffffff25] pt-6">
                  <p className="max-w-sm text-xs leading-5 text-[#aeb2a8]">
                    This form prepares an email in your email app. Nothing is sent from this website.
                  </p>
                </div>
              </div>

              <div className="min-w-0 bg-[#fbf8ef] px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
                <form
                  className="flex h-full flex-col"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const name = String(formData.get('name') ?? '').trim();
                    const email = String(formData.get('email') ?? '').trim();
                    const message = String(formData.get('message') ?? '').trim();
                    const subject = encodeURIComponent(`A message for ${content.businessName}`);
                    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
                    setContactNotice('Your email app should open with your message ready to send. Nothing has been sent yet.');
                    window.location.href = `mailto:${content.email}?subject=${subject}&body=${body}`;
                  }}
                  data-testid="form-contact"
                >
                  <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                    <div>
                      <label htmlFor="contact-name" className="eyebrow text-[10px] text-[#4f6354]">Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="mt-2 min-h-12 w-full rounded-lg border border-[#d5ded3] bg-[#fffdf8] px-4 text-sm text-[#273a30] outline-none transition placeholder:text-[#89958b] hover:border-[#9bb5a6] focus:border-[#285542] focus:ring-2 focus:ring-[#285542]/20"
                        placeholder="Your name"
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="eyebrow text-[10px] text-[#4f6354]">Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="mt-2 min-h-12 w-full rounded-lg border border-[#d5ded3] bg-[#fffdf8] px-4 text-sm text-[#273a30] outline-none transition placeholder:text-[#89958b] hover:border-[#9bb5a6] focus:border-[#285542] focus:ring-2 focus:ring-[#285542]/20"
                        placeholder="you@example.com"
                        data-testid="input-contact-email"
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <label htmlFor="contact-message" className="eyebrow text-[10px] text-[#4f6354]">Description</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={6}
                      className="mt-2 min-h-40 w-full resize-y rounded-lg border border-[#d5ded3] bg-[#fffdf8] px-4 py-3 text-sm leading-6 text-[#273a30] outline-none transition placeholder:text-[#89958b] hover:border-[#9bb5a6] focus:border-[#285542] focus:ring-2 focus:ring-[#285542]/20"
                      placeholder="Write your message here"
                      data-testid="input-contact-message"
                    />
                  </div>
                  <div className="mt-6 flex flex-col items-start gap-4 sm:mt-7">
                    <button
                      type="submit"
                      className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#285542] px-6 text-sm font-bold text-[#fbf8ef] transition hover:-translate-y-0.5 hover:bg-[#1d4433] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#285542]"
                      data-testid="button-contact-send"
                    >
                      Send message <ArrowRight size={17} aria-hidden="true" />
                    </button>
                    <p className="text-xs leading-5 text-[#70756c]" aria-live="polite" role="status" data-testid="text-contact-status">
                      {contactNotice || 'Selecting send opens your email app with the message prepared for you.'}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1e4334] py-8 text-[#e7ece2]">
        <div className="page-wrap flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold tracking-[-.02em]">Ampoma Psychotherapy</p>
            <p className="mt-1 text-xs text-[#b8cabe]">{content.serviceLine} · {content.locationNote}</p>
          </div>
        </div>
        <div className="page-wrap mt-7 border-t border-[#ffffff24] pt-5 text-[10px] tracking-[.04em] text-[#afc1b4]">
          © {new Date().getFullYear()} {content.businessName}
        </div>
      </footer>
    </div>
  );
}

function App() {
  return <SiteHome />;
}

export default App;
