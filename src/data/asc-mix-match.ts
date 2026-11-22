export interface MixMatchItem {
  type: 'top' | 'bottom' | 'bag' | 'shoes' | 'hijab';
  typeLabel: string;
  categoryTab: string;
  productId: string;
  name: string;
  color: string;
  image: string;
  platform: 'shopee' | 'tiktok';
  marketplaceName: string;
  affiliateUrl: string;
}

export interface MixMatchLook {
  id: string;
  title: string;
  subtitle: string;
  occasion: string;
  badge: string;
  fullLookImage: string;
  lalaQuote: string;
  items: {
    top: MixMatchItem;
    bottom: MixMatchItem;
    bag: MixMatchItem;
    shoes: MixMatchItem;
  };
}

export const ASC_MIX_MATCH_LOOKS: MixMatchLook[] = [
  {
    id: 'look-01',
    title: 'Chic & Timeless Cotton Blouse',
    subtitle: 'Look rapi, bersih, dan elegan untuk daily office, kuliah, maupun semi-formal',
    occasion: 'Office, Campus & Elegant Days',
    badge: 'Chic & Timeless',
    fullLookImage: '/products/blouse-cotton-editorial.webp',
    lalaQuote:
      'Blouse putih katun premium ini punya potongan ramping yang cantik banget di pinggang. Padukan dengan rok charcoal grey atau krem dan mules lancip biar look-nya sleek & timeless!',
    items: {
      top: {
        type: 'top',
        typeLabel: 'Atasan (Top)',
        categoryTab: 'tops',
        productId: 'asc-tp-01',
        name: 'Blouse Elegan Lembut Simple',
        color: 'Putih Bersih (White)',
        image: '/products/blouse-cotton-editorial.webp',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://s.shopee.co.id/8KrHWSxaaI',
      },
      bottom: {
        type: 'bottom',
        typeLabel: 'Bawahan (Bottom)',
        categoryTab: 'bottoms',
        productId: 'asc-bt-01',
        name: 'Rok Charcoal Grey / Cream Flare Silk',
        color: 'Charcoal Grey / Cream',
        image: '/lala-dress/lala-look-04-olive-saffron.jpg',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://shopee.co.id',
      },
      bag: {
        type: 'bag',
        typeLabel: 'Tas (Bag)',
        categoryTab: 'tas',
        productId: 'asc-tas-01',
        name: 'Minimalist Shoulder Bag Krem Ivory',
        color: 'Ivory Krem',
        image: '/lala-dress/lala-look-03-cobalt-platinum.jpg',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://shopee.co.id',
      },
      shoes: {
        type: 'shoes',
        typeLabel: 'Sepatu (Shoes)',
        categoryTab: 'sepatu',
        productId: 'asc-sp-01',
        name: 'Flat Mules Pointy Toe Krem Vanila',
        color: 'Krem Vanila',
        image: '/lala-dress/lala-kondangan-01-sage-champagne.jpg',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://shopee.co.id',
      },
    },
  },
  {
    id: 'look-02',
    title: 'Chic & Timeless Lace Blouse',
    subtitle: 'Paduan anggun blus brokat floral untuk acara pesta, arisan, atau hari elegan',
    occasion: 'Kondangan & Elegant Days',
    badge: 'Chic & Timeless',
    fullLookImage: '/products/blouse-kondangan-editorial.webp',
    lalaQuote:
      'Paduan blouse lace floral dusty rose ini dengan rok champagne beige dan heels tahu bikin look kelihatan anggun, mewah, dan timeless!',
    items: {
      top: {
        type: 'top',
        typeLabel: 'Atasan (Top)',
        categoryTab: 'tops',
        productId: 'asc-tp-02',
        name: 'Blouse Kondangan Brokat Floral',
        color: 'Dusty Rose Lilac',
        image: '/products/blouse-kondangan-editorial.webp',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://s.shopee.co.id/9V3EwEiOIE',
      },
      bottom: {
        type: 'bottom',
        typeLabel: 'Bawahan (Bottom)',
        categoryTab: 'bottoms',
        productId: 'asc-bt-01',
        name: 'Rok Plisket Flare Silk Krem Champagne',
        color: 'Krem Champagne',
        image: '/lala-dress/lala-look-04-olive-saffron.jpg',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://shopee.co.id',
      },
      bag: {
        type: 'bag',
        typeLabel: 'Tas (Bag)',
        categoryTab: 'tas',
        productId: 'asc-tas-01',
        name: 'Minimalist Shoulder Bag Krem Ivory',
        color: 'Ivory Krem',
        image: '/lala-dress/lala-look-03-cobalt-platinum.jpg',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://shopee.co.id',
      },
      shoes: {
        type: 'shoes',
        typeLabel: 'Sepatu (Shoes)',
        categoryTab: 'sepatu',
        productId: 'asc-sp-03',
        name: 'Block Heels 3cm Ivory Pearl Kondangan',
        color: 'Ivory Pearl',
        image: '/lala-dress/lala-kondangan-02-dusty-rose.jpg',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://shopee.co.id',
      },
    },
  },
  {
    id: 'look-03',
    title: 'Parisian Chic Maroon Tweed Blouse',
    subtitle: 'Blouse tweed premium bergaya Korean & Parisian dengan aksen list kepang dan kancing mutiara',
    occasion: 'Office, Cafe & Elegant Days',
    badge: 'Parisian Chic',
    fullLookImage: '/products/blouse-tweed-editorial.webp',
    lalaQuote:
      'Blouse tweed maroon ini classy banget! Aksen list kepang dan kancing mutiaranya ngasih vibe Parisian chic seketika. Tinggal padu rok warna krem/beige dan tas sling bag senada.',
    items: {
      top: {
        type: 'top',
        typeLabel: 'Atasan (Top)',
        categoryTab: 'tops',
        productId: 'asc-tp-03',
        name: 'Blouse Tweed Parisian Chic Maroon',
        color: 'Maroon',
        image: '/products/blouse-maroon-korean-parisian.webp',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://s.shopee.co.id/5VX6ItMTHY',
      },
      bottom: {
        type: 'bottom',
        typeLabel: 'Bawahan (Bottom)',
        categoryTab: 'bottoms',
        productId: 'asc-bt-03',
        name: 'Rok A-Line / Plisket Cream Beige',
        color: 'Cream / Beige / Grey',
        image: '/lala-dress/lala-look-03-cobalt-platinum.jpg',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://shopee.co.id',
      },
      bag: {
        type: 'bag',
        typeLabel: 'Tas (Bag)',
        categoryTab: 'tas',
        productId: 'asc-tas-02',
        name: 'Quilted Chain Shoulder Bag Ivory',
        color: 'Ivory / Cream',
        image: '/lala-dress/lala-nordic-10-olive-cream.jpg',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://shopee.co.id',
      },
      shoes: {
        type: 'shoes',
        typeLabel: 'Sepatu (Shoes)',
        categoryTab: 'sepatu',
        productId: 'asc-sp-01',
        name: 'Flat Mules Pointy Toe Krem Vanila',
        color: 'Krem Vanila',
        image: '/lala-dress/lala-kondangan-01-sage-champagne.jpg',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://shopee.co.id',
      },
    },
  },
  {
    id: 'look-04',
    title: 'Graceful Silk Festive & Event',
    subtitle: 'Kombinasi elegan dengan kilau lembut untuk menghadiri acara resmi atau arisan',
    occasion: 'Semi-Formal & Special Event',
    badge: 'Anggun Berkelas',
    fullLookImage: '/lala-dress/lala-kondangan-01-sage-champagne.jpg',
    lalaQuote:
      'Untuk acara formal tapi gak pengen ribet, padu padan atasan tunik flowy dengan rok silk dan heels 3cm ini pilihan paling aman dan nyaman!',
    items: {
      top: {
        type: 'top',
        typeLabel: 'Atasan (Top)',
        categoryTab: 'tops',
        productId: 'asc-tp-02',
        name: 'Blouse Kondangan Brokat Floral',
        color: 'Dusty Rose Lilac',
        image: '/products/blouse-kondangan-brokat-floral.webp',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://s.shopee.co.id/9V3EwEiOIE',
      },
      bottom: {
        type: 'bottom',
        typeLabel: 'Bawahan (Bottom)',
        categoryTab: 'bottoms',
        productId: 'asc-bt-01',
        name: 'Rok Plisket Flare Silk Krem Lembut',
        color: 'Krem Vanila',
        image: '/lala-dress/lala-look-04-olive-saffron.jpg',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://shopee.co.id',
      },
      bag: {
        type: 'bag',
        typeLabel: 'Tas (Bag)',
        categoryTab: 'tas',
        productId: 'asc-tas-01',
        name: 'Minimalist Shoulder Bag Krem Ivory',
        color: 'Ivory Krem',
        image: '/lala-dress/lala-look-03-cobalt-platinum.jpg',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://shopee.co.id',
      },
      shoes: {
        type: 'shoes',
        typeLabel: 'Sepatu (Shoes)',
        categoryTab: 'sepatu',
        productId: 'asc-sp-03',
        name: 'Block Heels 3cm Ivory Pearl Kondangan',
        color: 'Ivory Pearl',
        image: '/lala-dress/lala-kondangan-02-dusty-rose.jpg',
        platform: 'shopee',
        marketplaceName: 'Shopee',
        affiliateUrl: 'https://shopee.co.id',
      },
    },
  },
];
