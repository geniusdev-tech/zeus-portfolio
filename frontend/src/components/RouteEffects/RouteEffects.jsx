import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n';

const SITE_ORIGIN = import.meta.env.VITE_SITE_URL || 'https://zeusprotocol.cloud';

const LOCALE_OG = {
  'en-US': 'en_US',
  'pt-BR': 'pt_BR',
  'es-ES': 'es_ES',
};

const PAGE_TITLES = {
  'en-US': {
    docs: 'Documentation',
    packages: 'Packages',
    cases: 'Case Studies',
    terminal: 'ZEUS AI Terminal',
    notFound: 'Page not found',
  },
  'pt-BR': {
    docs: 'Documentação',
    packages: 'Pacotes',
    cases: 'Casos',
    terminal: 'Terminal ZEUS AI',
    notFound: 'Página não encontrada',
  },
  'es-ES': {
    docs: 'Documentación',
    packages: 'Paquetes',
    cases: 'Casos',
    terminal: 'Terminal ZEUS AI',
    notFound: 'Página no encontrada',
  },
};

const PAGE_DESCRIPTIONS = {
  'en-US': {
    docs: 'Technical documentation and access notes for released ZEUS builds.',
    packages: 'Clear scopes, fixed prices, and guaranteed outcomes for productized services.',
    cases: 'Real business problems solved with precision engineering.',
    terminal: 'Interactive lead intake terminal for ZEUS Protocol.',
    notFound: 'The requested route does not exist or has moved.',
  },
  'pt-BR': {
    docs: 'Documentação técnica e notas de acesso dos builds liberados da ZEUS.',
    packages: 'Escopos claros, preços fixos e resultados garantidos para serviços empacotados.',
    cases: 'Problemas reais de negócio resolvidos com engenharia de precisão.',
    terminal: 'Terminal interativo de captacao de leads da ZEUS Protocol.',
    notFound: 'A rota solicitada não existe ou mudou de endereço.',
  },
  'es-ES': {
    docs: 'Documentación técnica y notas de acceso de los builds liberados de ZEUS.',
    packages: 'Alcances claros, precios fijos y resultados garantizados para servicios empaquetados.',
    cases: 'Problemas reales de negocio resueltos con ingeniería de precisión.',
    terminal: 'Terminal interactivo de captación de leads de ZEUS Protocol.',
    notFound: 'La ruta solicitada no existe o se movió de dirección.',
  },
};

const KNOWN_PATHS = new Set(['/', '/terminal', '/qelox', '/docs', '/packages', '/cases']);

function setMeta(selector, value) {
  if (typeof document === 'undefined' || !value) {
    return;
  }

  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute('content', value);
  }
}

function setLink(selector, href) {
  if (typeof document === 'undefined' || !href) {
    return;
  }

  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute('href', href);
  }
}

function getRouteSeo({ pathname, locale, content, isMaintenance }) {
  const normalizedPath = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const localeTitles = PAGE_TITLES[locale] || PAGE_TITLES['en-US'];
  const localeDescriptions = PAGE_DESCRIPTIONS[locale] || PAGE_DESCRIPTIONS['en-US'];
  const isKnownPath = KNOWN_PATHS.has(normalizedPath);
  const canonicalPath = normalizedPath === '/' ? '/' : normalizedPath;
  const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;

  if (!isKnownPath) {
    return {
      title: `${localeTitles.notFound} | ZeusProtocol.cloud`,
      description: localeDescriptions.notFound,
      ogTitle: `${localeTitles.notFound} | ZeusProtocol.cloud`,
      ogDescription: localeDescriptions.notFound,
      twitterTitle: `${localeTitles.notFound} | ZeusProtocol.cloud`,
      twitterDescription: localeDescriptions.notFound,
      canonicalUrl: `${SITE_ORIGIN}/`,
      robots: 'noindex,follow',
    };
  }

  if (normalizedPath === '/terminal') {
    return {
      title: `${content.terminal.title} | ZeusProtocol.cloud`,
      description: content.terminal.lead,
      ogTitle: `${content.terminal.title} | ZeusProtocol.cloud`,
      ogDescription: content.terminal.lead,
      twitterTitle: `${content.terminal.title} | ZeusProtocol.cloud`,
      twitterDescription: content.terminal.lead,
      canonicalUrl,
      robots: 'index,follow',
    };
  }

  if (normalizedPath === '/qelox') {
    if (isMaintenance) {
      return {
        title: `${content.maintenance.title} | ZeusProtocol.cloud`,
        description: content.maintenance.message,
        ogTitle: `${content.maintenance.title} | ZeusProtocol.cloud`,
        ogDescription: content.maintenance.message,
        twitterTitle: `${content.maintenance.title} | ZeusProtocol.cloud`,
        twitterDescription: content.maintenance.message,
        canonicalUrl,
        robots: 'index,follow',
      };
    }

    return {
      title: `${content.quelox.title} | ZeusProtocol.cloud`,
      description: content.quelox.lead,
      ogTitle: `${content.quelox.title} | ZeusProtocol.cloud`,
      ogDescription: content.quelox.lead,
      twitterTitle: `${content.quelox.title} | ZeusProtocol.cloud`,
      twitterDescription: content.quelox.lead,
      canonicalUrl,
      robots: 'index,follow',
    };
  }

  if (normalizedPath === '/docs') {
    return {
      title: `${localeTitles.docs} | ZeusProtocol.cloud`,
      description: localeDescriptions.docs,
      ogTitle: `${localeTitles.docs} | ZeusProtocol.cloud`,
      ogDescription: localeDescriptions.docs,
      twitterTitle: `${localeTitles.docs} | ZeusProtocol.cloud`,
      twitterDescription: localeDescriptions.docs,
      canonicalUrl,
      robots: 'index,follow',
    };
  }

  if (normalizedPath === '/packages') {
    return {
      title: `${content.packages.title} | ZeusProtocol.cloud`,
      description: content.packages.subtitle,
      ogTitle: `${content.packages.title} | ZeusProtocol.cloud`,
      ogDescription: content.packages.subtitle,
      twitterTitle: `${content.packages.title} | ZeusProtocol.cloud`,
      twitterDescription: content.packages.subtitle,
      canonicalUrl,
      robots: 'index,follow',
    };
  }

  if (normalizedPath === '/cases') {
    return {
      title: `${content.cases.title} | ZeusProtocol.cloud`,
      description: content.cases.subtitle,
      ogTitle: `${content.cases.title} | ZeusProtocol.cloud`,
      ogDescription: content.cases.subtitle,
      twitterTitle: `${content.cases.title} | ZeusProtocol.cloud`,
      twitterDescription: content.cases.subtitle,
      canonicalUrl,
      robots: 'index,follow',
    };
  }

  return {
    title: content.seo.title,
    description: content.seo.description,
    ogTitle: content.seo.ogTitle,
    ogDescription: content.seo.ogDescription,
    twitterTitle: content.seo.twitterTitle,
    twitterDescription: content.seo.twitterDescription,
    canonicalUrl,
    robots: 'index,follow',
  };
}

export default function RouteEffects() {
  const location = useLocation();
  const { locale, content } = useI18n();
  const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

  const routeSeo = useMemo(
    () => getRouteSeo({
      pathname: location.pathname,
      locale,
      content,
      isMaintenance,
    }),
    [content, isMaintenance, locale, location.pathname],
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (location.hash) {
      return;
    }

    window.scrollTo(0, 0);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.title = routeSeo.title;
    setMeta('meta[name="description"]', routeSeo.description);
    setMeta('meta[property="og:title"]', routeSeo.ogTitle);
    setMeta('meta[property="og:description"]', routeSeo.ogDescription);
    setMeta('meta[property="og:locale"]', LOCALE_OG[locale] || LOCALE_OG['en-US']);
    setMeta('meta[property="og:url"]', routeSeo.canonicalUrl);
    setMeta('meta[name="twitter:title"]', routeSeo.twitterTitle);
    setMeta('meta[name="twitter:description"]', routeSeo.twitterDescription);
    setMeta('meta[name="robots"]', routeSeo.robots);
    setLink('link[rel="canonical"]', routeSeo.canonicalUrl);
  }, [locale, routeSeo]);

  return null;
}
