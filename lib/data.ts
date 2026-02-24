export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  category: string
  rating: number
  reviewCount: number
  images: string[]
  features: string[]
  inStock: boolean
}

export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  address: {
    name: string
    phone: string
    address: string
    pincode: string
  }
  status: "processing" | "shipped" | "out-for-delivery" | "delivered"
  date: string
}

export const categories = [
  { id: "electronics", name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop", count: 8 },
  { id: "clothing", name: "Clothing", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop", count: 6 },
  { id: "home", name: "Home & Living", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop", count: 6 },
  { id: "sports", name: "Sports & Fitness", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop", count: 5 },
  { id: "books", name: "Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop", count: 5 },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    originalPrice: 349.99,
    description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality. Features adaptive sound control and multipoint connection for seamless switching between devices.",
    category: "electronics",
    rating: 4.7,
    reviewCount: 328,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
    ],
    features: ["Active Noise Cancellation", "30-hour battery", "Bluetooth 5.2", "Multipoint connection"],
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Fitness Watch Pro",
    price: 199.99,
    originalPrice: 279.99,
    description: "Advanced fitness tracker with GPS, heart rate monitor, sleep tracking, and 100+ workout modes. Water-resistant up to 50m with a stunning AMOLED display.",
    category: "electronics",
    rating: 4.5,
    reviewCount: 215,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop",
    ],
    features: ["GPS tracking", "Heart rate monitor", "100+ workout modes", "5ATM water resistance"],
    inStock: true,
  },
  {
    id: "3",
    name: "Ultra-Slim Laptop 15\"",
    price: 1299.99,
    originalPrice: 1499.99,
    description: "Powerhouse performance in an incredibly thin design. Featuring the latest processor, 16GB RAM, 512GB SSD, and a vibrant 15-inch Retina display.",
    category: "electronics",
    rating: 4.8,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
    ],
    features: ["Latest Gen Processor", "16GB RAM", "512GB SSD", "15-inch Retina Display"],
    inStock: true,
  },
  {
    id: "4",
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    description: "Compact yet powerful speaker with 360-degree sound, 20-hour battery life, and IP67 waterproof rating. Perfect for outdoor adventures.",
    category: "electronics",
    rating: 4.4,
    reviewCount: 432,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&h=600&fit=crop",
    ],
    features: ["360-degree sound", "20-hour battery", "IP67 waterproof", "USB-C charging"],
    inStock: true,
  },
  {
    id: "5",
    name: "Premium Cotton T-Shirt",
    price: 39.99,
    description: "Super soft 100% organic cotton t-shirt with a modern relaxed fit. Pre-shrunk and durable, available in multiple colors.",
    category: "clothing",
    rating: 4.3,
    reviewCount: 187,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop",
    ],
    features: ["100% Organic Cotton", "Relaxed fit", "Pre-shrunk", "Machine washable"],
    inStock: true,
  },
  {
    id: "6",
    name: "Classic Denim Jacket",
    price: 89.99,
    originalPrice: 119.99,
    description: "Timeless denim jacket crafted from premium selvedge denim. Features classic button closure, chest pockets, and a comfortable fit.",
    category: "clothing",
    rating: 4.6,
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=600&h=600&fit=crop",
    ],
    features: ["Selvedge denim", "Button closure", "Chest pockets", "Classic fit"],
    inStock: true,
  },
  {
    id: "7",
    name: "Running Sneakers Pro",
    price: 129.99,
    originalPrice: 159.99,
    description: "High-performance running shoes with responsive cushioning, breathable mesh upper, and superior traction. Designed for both road and trail running.",
    category: "clothing",
    rating: 4.5,
    reviewCount: 276,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop",
    ],
    features: ["Responsive cushioning", "Breathable mesh", "Superior traction", "Lightweight"],
    inStock: true,
  },
  {
    id: "8",
    name: "Minimalist Ceramic Vase Set",
    price: 54.99,
    description: "Set of 3 handcrafted ceramic vases in matte finish. Perfect for modern and minimalist home decor. Each piece is unique.",
    category: "home",
    rating: 4.6,
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=600&fit=crop",
    ],
    features: ["Handcrafted", "Matte finish", "Set of 3", "Modern design"],
    inStock: true,
  },
  {
    id: "9",
    name: "Scented Soy Candle Collection",
    price: 34.99,
    description: "Luxury soy wax candles with natural essential oils. Long-lasting 60-hour burn time. Available in Lavender, Vanilla, and Eucalyptus.",
    category: "home",
    rating: 4.8,
    reviewCount: 312,
    images: [
      "https://images.unsplash.com/photo-1602607616984-06ee5b9a9e31?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1543006280-ea0c8e68ba2a?w=600&h=600&fit=crop",
    ],
    features: ["100% soy wax", "Natural essential oils", "60-hour burn", "3 scents included"],
    inStock: true,
  },
  {
    id: "10",
    name: "Yoga Mat Premium",
    price: 49.99,
    originalPrice: 69.99,
    description: "Professional-grade yoga mat with superior grip and cushioning. Made from eco-friendly TPE material, 6mm thick for joint protection.",
    category: "sports",
    rating: 4.4,
    reviewCount: 198,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=600&fit=crop",
    ],
    features: ["Eco-friendly TPE", "6mm thickness", "Non-slip surface", "Carrying strap included"],
    inStock: true,
  },
  {
    id: "11",
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    description: "Double-wall vacuum insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof.",
    category: "sports",
    rating: 4.7,
    reviewCount: 567,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&h=600&fit=crop",
    ],
    features: ["Vacuum insulated", "24h cold / 12h hot", "BPA-free", "Leak-proof lid"],
    inStock: true,
  },
  {
    id: "12",
    name: "Modern Desk Lamp",
    price: 69.99,
    originalPrice: 89.99,
    description: "Sleek LED desk lamp with adjustable brightness and color temperature. Features USB charging port and touch-sensitive controls.",
    category: "home",
    rating: 4.5,
    reviewCount: 143,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057ab219?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600&h=600&fit=crop",
    ],
    features: ["Adjustable brightness", "Color temperature control", "USB charging port", "Touch controls"],
    inStock: true,
  },
  {
    id: "13",
    name: "Classic Novel Collection",
    price: 44.99,
    description: "Beautifully bound collection of 5 classic novels including Pride and Prejudice, 1984, To Kill a Mockingbird, The Great Gatsby, and Jane Eyre.",
    category: "books",
    rating: 4.9,
    reviewCount: 234,
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=600&fit=crop",
    ],
    features: ["5 classic novels", "Hardcover binding", "Gilt page edges", "Collector's edition"],
    inStock: true,
  },
  {
    id: "14",
    name: "Wireless Earbuds Elite",
    price: 149.99,
    originalPrice: 199.99,
    description: "True wireless earbuds with premium sound quality, adaptive noise cancellation, and 8-hour battery life per charge. Compact charging case included.",
    category: "electronics",
    rating: 4.6,
    reviewCount: 445,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop",
    ],
    features: ["Adaptive ANC", "8-hour battery", "Wireless charging", "IPX5 water resistant"],
    inStock: true,
  },
  {
    id: "15",
    name: "Leather Crossbody Bag",
    price: 79.99,
    originalPrice: 99.99,
    description: "Genuine leather crossbody bag with adjustable strap. Multiple compartments for organized storage. Perfect for everyday use.",
    category: "clothing",
    rating: 4.4,
    reviewCount: 167,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
    ],
    features: ["Genuine leather", "Adjustable strap", "Multiple compartments", "Zipper closure"],
    inStock: true,
  },
  {
    id: "16",
    name: "Resistance Bands Set",
    price: 24.99,
    description: "Set of 5 premium resistance bands with different tension levels. Includes carrying bag and exercise guide. Perfect for home workouts.",
    category: "sports",
    rating: 4.3,
    reviewCount: 389,
    images: [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop",
    ],
    features: ["5 tension levels", "Latex-free", "Carrying bag included", "Exercise guide"],
    inStock: true,
  },
  {
    id: "17",
    name: "Cozy Throw Blanket",
    price: 44.99,
    description: "Ultra-soft microfiber throw blanket with elegant fringe detail. Perfect for cozy evenings on the couch. Machine washable.",
    category: "home",
    rating: 4.7,
    reviewCount: 256,
    images: [
      "https://images.unsplash.com/photo-1580301762395-21ce6d555b43?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=600&fit=crop",
    ],
    features: ["Ultra-soft microfiber", "Fringe detail", "Machine washable", '50" x 60"'],
    inStock: true,
  },
  {
    id: "18",
    name: "Self-Help Bestseller Bundle",
    price: 39.99,
    description: "Curated collection of 3 bestselling self-help books covering mindfulness, productivity, and personal growth.",
    category: "books",
    rating: 4.5,
    reviewCount: 178,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop",
    ],
    features: ["3 bestsellers", "Paperback", "Mindfulness & productivity", "Personal growth"],
    inStock: true,
  },
  {
    id: "19",
    name: "Wireless Charging Pad",
    price: 34.99,
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek aluminum design with LED indicator and overheat protection.",
    category: "electronics",
    rating: 4.3,
    reviewCount: 287,
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=600&h=600&fit=crop",
    ],
    features: ["15W fast charging", "Qi compatible", "Aluminum design", "Overheat protection"],
    inStock: true,
  },
  {
    id: "20",
    name: "Linen Button-Up Shirt",
    price: 64.99,
    description: "Breathable pure linen shirt perfect for warm weather. Features a relaxed fit with mother-of-pearl buttons and a mandarin collar.",
    category: "clothing",
    rating: 4.4,
    reviewCount: 134,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603252109612-24fa03d145c8?w=600&h=600&fit=crop",
    ],
    features: ["100% linen", "Mother-of-pearl buttons", "Mandarin collar", "Relaxed fit"],
    inStock: true,
  },
]

export const initialReviews: Review[] = [
  { id: "r1", productId: "1", author: "Alex M.", rating: 5, comment: "Best headphones I've ever owned. The noise cancellation is incredible!", date: "2026-01-15" },
  { id: "r2", productId: "1", author: "Sarah K.", rating: 4, comment: "Great sound quality, very comfortable for long listening sessions.", date: "2026-01-20" },
  { id: "r3", productId: "1", author: "James L.", rating: 5, comment: "Worth every penny. Battery life is amazing.", date: "2026-02-01" },
  { id: "r4", productId: "2", author: "Emily R.", rating: 4, comment: "Accurate tracking and beautiful display. Love the sleep tracking feature.", date: "2026-01-18" },
  { id: "r5", productId: "2", author: "Mike T.", rating: 5, comment: "Best fitness watch in this price range. GPS is very accurate.", date: "2026-02-05" },
  { id: "r6", productId: "3", author: "David W.", rating: 5, comment: "Incredibly fast and the display is stunning. Worth the investment.", date: "2026-01-22" },
  { id: "r7", productId: "5", author: "Lisa P.", rating: 4, comment: "So comfortable! The organic cotton feels amazing on the skin.", date: "2026-01-25" },
  { id: "r8", productId: "8", author: "Nina S.", rating: 5, comment: "Beautiful craftsmanship. These vases look amazing in my living room.", date: "2026-02-10" },
  { id: "r9", productId: "10", author: "Chris G.", rating: 4, comment: "Great grip and cushioning. Perfect thickness for my yoga practice.", date: "2026-01-30" },
  { id: "r10", productId: "13", author: "Anna B.", rating: 5, comment: "Stunning collection. The binding quality is exceptional.", date: "2026-02-15" },
]

export function generateOrderId(): string {
  return "ORD-" + Math.random().toString(36).substring(2, 8).toUpperCase() + "-" + Date.now().toString(36).toUpperCase()
}
