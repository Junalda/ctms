// Navigatie- en footerstructuur, centraal beheerd zodat header en footer
// uit één bron putten. Labels zijn vertaald naar het Nederlands; vaktermen
// die in het Nederlands gangbaar Engels blijven (Content) blijven staan.

export const navLinks = [
  { name: 'Werk', to: '/portfolio' },
  { name: 'Diensten', to: '/services' },
  { name: 'Vastgoed', to: '/real-estate' },
  { name: 'Content', to: '/content-creation' },
  { name: 'Werkwijze', to: '/process' },
  { name: 'Over', to: '/about' },
];

export const footerServices = [
  { name: 'Vastgoed', to: '/real-estate' },
  { name: 'Personal branding', to: '/content-creation' },
  { name: 'Merkverhalen', to: '/services' },
  { name: 'Contentstrategie', to: '/services' },
];

export const footerStudio = [
  { name: 'Over Gabriel', to: '/about' },
  { name: 'Werkwijze', to: '/process' },
  { name: 'Portfolio', to: '/portfolio' },
  { name: 'Contact', to: '/contact' },
];

export const footerLocations = [
  { name: 'Rotterdam Vastgoed', to: '/rotterdam-real-estate' },
  { name: 'Rotterdam Branding', to: '/rotterdam-personal-branding' },
];
