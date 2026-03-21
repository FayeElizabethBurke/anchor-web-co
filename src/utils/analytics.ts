class Analytics {
  private static depthsFired = new Set<number>();

  static track(event: string, params: Record<string, string> = {}): void {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', event, params);
    }
  }

  static initScrollDepth(): void {
    window.addEventListener('scroll', () => {
      const pct =
        ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100;
      [25, 50, 75, 90].forEach((d) => {
        if (pct >= d && !this.depthsFired.has(d)) {
          this.depthsFired.add(d);
          this.track('scroll_depth', { depth: `${d}%` });
        }
      });
    }, { passive: true });
  }

  static initSectionTracking(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const name = (entry.target as HTMLElement).dataset.trackSection;
            if (name) this.track('section_view', { section_name: name });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll('[data-track-section]').forEach((el) => observer.observe(el));
  }

  static initClickTracking(): void {
    document.addEventListener('click', (e) => {
      const el = (e.target as Element).closest('[data-gtag-event]') as HTMLElement | null;
      if (!el) return;
      this.track(el.dataset.gtagEvent ?? 'click', {
        event_category: el.dataset.gtagCategory ?? 'engagement',
        event_label: el.dataset.gtagLabel ?? el.textContent?.trim() ?? '',
      });
    });
  }

  static initFormTracking(form: HTMLFormElement): void {
    let started = false;
    form.querySelectorAll('input, textarea').forEach((field) => {
      field.addEventListener('focus', () => {
        if (!started) {
          started = true;
          this.track('form_start', { form_name: 'quote_form' });
        }
      }, { once: true });
    });
  }

  static formSuccess(): void {
    this.track('generate_lead', { form_name: 'quote_form' });
  }

  static formError(): void {
    this.track('form_error', { form_name: 'quote_form' });
  }

  static init(): void {
    this.initScrollDepth();
    this.initSectionTracking();
    this.initClickTracking();
  }
}

export default Analytics;
