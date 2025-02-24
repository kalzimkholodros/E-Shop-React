const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage
const products = [
  // Elektronik
  {
    id: 1,
    name: 'Akıllı Saat Pro',
    price: 1299.99,
    rating: 4.8,
    discount: 20,
    category: 'Elektronik',
    description: 'Son teknoloji akıllı saat, sağlık takibi ve bildirim özellikleri.',
    reviews: [
      { id: 1, user: 'Mehmet A.', rating: 5, comment: 'Harika bir ürün', date: '2024-01-15' }
    ]
  },
  {
    id: 2,
    name: 'Kablosuz Kulaklık',
    price: 899.99,
    rating: 4.6,
    discount: 10,
    category: 'Elektronik',
    description: 'Gürültü önleyici özellikli kablosuz kulaklık.',
    reviews: []
  },
  {
    id: 3,
    name: 'Tablet PC',
    price: 4599.99,
    rating: 4.7,
    discount: 15,
    category: 'Elektronik',
    description: '10.8 inç ekran, 128GB depolama.',
    reviews: []
  },
  {
    id: 4,
    name: 'Bluetooth Hoparlör',
    price: 449.99,
    rating: 4.5,
    discount: 0,
    category: 'Elektronik',
    description: 'Su geçirmez, taşınabilir hoparlör.',
    reviews: []
  },

  // Giyim
  {
    id: 5,
    name: 'Deri Ceket',
    price: 799.99,
    rating: 4.4,
    discount: 25,
    category: 'Giyim',
    description: 'Hakiki deri, klasik kesim.',
    reviews: []
  },
  {
    id: 6,
    name: 'Pamuklu T-Shirt',
    price: 129.99,
    rating: 4.3,
    discount: 0,
    category: 'Giyim',
    description: '%100 pamuk, basic model.',
    reviews: []
  },
  {
    id: 7,
    name: 'Slim Fit Pantolon',
    price: 299.99,
    rating: 4.5,
    discount: 10,
    category: 'Giyim',
    description: 'Rahat kalıp, şık tasarım.',
    reviews: []
  },
  {
    id: 8,
    name: 'Örme Kazak',
    price: 249.99,
    rating: 4.2,
    discount: 0,
    category: 'Giyim',
    description: 'Sıcak tutan kış kazağı.',
    reviews: []
  },

  // Aksesuar
  {
    id: 9,
    name: 'Deri Cüzdan',
    price: 199.99,
    rating: 4.6,
    discount: 0,
    category: 'Aksesuar',
    description: 'El yapımı deri cüzdan.',
    reviews: []
  },
  {
    id: 10,
    name: 'Güneş Gözlüğü',
    price: 349.99,
    rating: 4.4,
    discount: 15,
    category: 'Aksesuar',
    description: 'UV korumalı, polarize cam.',
    reviews: []
  },
  {
    id: 11,
    name: 'Kol Saati',
    price: 599.99,
    rating: 4.7,
    discount: 10,
    category: 'Aksesuar',
    description: 'Klasik tasarım, su geçirmez.',
    reviews: []
  },
  {
    id: 12,
    name: 'Deri Kemer',
    price: 149.99,
    rating: 4.3,
    discount: 0,
    category: 'Aksesuar',
    description: 'Hakiki deri, klasik model.',
    reviews: []
  },

  // Ev & Yaşam
  {
    id: 13,
    name: 'Aromaterapi Difüzör',
    price: 299.99,
    rating: 4.5,
    discount: 20,
    category: 'Ev & Yaşam',
    description: 'LED ışıklı, otomatik kapanma.',
    reviews: []
  },
  {
    id: 14,
    name: 'Dekoratif Yastık',
    price: 89.99,
    rating: 4.2,
    discount: 0,
    category: 'Ev & Yaşam',
    description: 'Kadife kumaş, şık tasarım.',
    reviews: []
  },
  {
    id: 15,
    name: 'Masa Lambası',
    price: 199.99,
    rating: 4.6,
    discount: 15,
    category: 'Ev & Yaşam',
    description: 'Modern tasarım, dimmer özellikli.',
    reviews: []
  },
  {
    id: 16,
    name: 'Duvar Saati',
    price: 159.99,
    rating: 4.4,
    discount: 0,
    category: 'Ev & Yaşam',
    description: 'Minimalist tasarım.',
    reviews: []
  },

  // Kozmetik
  {
    id: 17,
    name: 'Parfüm',
    price: 449.99,
    rating: 4.8,
    discount: 10,
    category: 'Kozmetik',
    description: 'Kalıcı koku, özel seri.',
    reviews: []
  },
  {
    id: 18,
    name: 'Cilt Bakım Seti',
    price: 299.99,
    rating: 4.6,
    discount: 25,
    category: 'Kozmetik',
    description: 'Doğal içerikli bakım seti.',
    reviews: []
  },
  {
    id: 19,
    name: 'Makyaj Paleti',
    price: 199.99,
    rating: 4.5,
    discount: 0,
    category: 'Kozmetik',
    description: '18 renk göz farı paleti.',
    reviews: []
  },
  {
    id: 20,
    name: 'El Kremi',
    price: 49.99,
    rating: 4.3,
    discount: 0,
    category: 'Kozmetik',
    description: 'Nemlendirici el kremi.',
    reviews: []
  },

  // Spor
  {
    id: 21,
    name: 'Yoga Matı',
    price: 149.99,
    rating: 4.7,
    discount: 0,
    category: 'Spor',
    description: 'Kaymaz yüzey, taşıma askılı.',
    reviews: []
  },
  {
    id: 22,
    name: 'Koşu Ayakkabısı',
    price: 699.99,
    rating: 4.6,
    discount: 20,
    category: 'Spor',
    description: 'Hafif ve ergonomik tasarım.',
    reviews: []
  },
  {
    id: 23,
    name: 'Fitness Seti',
    price: 299.99,
    rating: 4.4,
    discount: 15,
    category: 'Spor',
    description: '2 dambıl ve direnç bandı.',
    reviews: []
  },
  {
    id: 24,
    name: 'Spor Çantası',
    price: 199.99,
    rating: 4.3,
    discount: 0,
    category: 'Spor',
    description: 'Dayanıklı malzeme, çok bölmeli.',
    reviews: []
  },

  // Kitap & Hobi
  {
    id: 25,
    name: 'Bestseller Roman',
    price: 49.99,
    rating: 4.8,
    discount: 10,
    category: 'Kitap & Hobi',
    description: 'Çok satan roman, sert kapak.',
    reviews: []
  },
  {
    id: 26,
    name: 'Boya Seti',
    price: 199.99,
    rating: 4.5,
    discount: 0,
    category: 'Kitap & Hobi',
    description: '24 renk akrilik boya seti.',
    reviews: []
  },
  {
    id: 27,
    name: 'Puzzle',
    price: 129.99,
    rating: 4.4,
    discount: 15,
    category: 'Kitap & Hobi',
    description: '1000 parça manzara puzzle.',
    reviews: []
  },
  {
    id: 28,
    name: 'Satranç Takımı',
    price: 249.99,
    rating: 4.7,
    discount: 0,
    category: 'Kitap & Hobi',
    description: 'Ahşap satranç takımı.',
    reviews: []
  },
  {
    id: 29,
    name: 'Fotoğraf Albümü',
    price: 89.99,
    rating: 4.3,
    discount: 0,
    category: 'Kitap & Hobi',
    description: '100 sayfa, özel tasarım.',
    reviews: []
  },
  {
    id: 30,
    name: 'Çizim Defteri',
    price: 39.99,
    rating: 4.4,
    discount: 0,
    category: 'Kitap & Hobi',
    description: 'A4 boyut, kaliteli kağıt.',
    reviews: []
  }
];

const categories = [
  'Elektronik',
  'Giyim',
  'Aksesuar',
  'Ev & Yaşam',
  'Kozmetik',
  'Spor',
  'Kitap & Hobi'
];

let favorites = [];
let cart = [];

let users = [
  {
    id: 1,
    email: 'test@test.com',
    password: '123456', // Gerçek uygulamada şifreler hash'lenmelidir
    name: 'Test User'
  }
];

// Kullanıcı siparişleri
let orders = [
  {
    id: 1,
    userId: 1,
    date: '2024-01-15',
    total: 299.99,
    status: 'Tamamlandı'
  }
];

// Kullanıcı değerlendirmeleri
let reviews = [
  {
    id: 1,
    userId: 1,
    productId: 1,
    productName: 'Premium Deri Cüzdan',
    rating: 5,
    comment: 'Çok kaliteli bir ürün'
  }
];

// Routes
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  if (category) {
    const filteredProducts = products.filter(p => p.category === category);
    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// Favoriler için route'lar
app.get('/api/favorites', (req, res) => {
  const favoriteProducts = products.filter(product => 
    favorites.some(f => f.productId === product.id)
  );
  res.json(favoriteProducts);
});

app.post('/api/favorites', (req, res) => {
  const { productId } = req.body;
  const existingIndex = favorites.findIndex(f => f.productId === productId);
  
  if (existingIndex >= 0) {
    favorites = favorites.filter(f => f.productId !== productId);
    res.json({ message: 'Ürün favorilerden çıkarıldı', isFavorite: false });
  } else {
    favorites.push({ productId });
    res.json({ message: 'Ürün favorilere eklendi', isFavorite: true });
  }
});

app.get('/api/favorites/check/:productId', (req, res) => {
  const { productId } = req.params;
  const isFavorite = favorites.some(f => f.productId === parseInt(productId));
  res.json({ isFavorite });
});

// Sepet için route'lar
app.get('/api/cart', (req, res) => {
  const cartProducts = cart.map(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);
    return {
      ...product,
      quantity: cartItem.quantity
    };
  });
  res.json(cartProducts);
});

app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  
  res.json({ message: 'Ürün sepete eklendi' });
});

app.delete('/api/cart/:productId', (req, res) => {
  const { productId } = req.params;
  cart = cart.filter(item => item.productId !== parseInt(productId));
  res.json({ message: 'Ürün sepetten çıkarıldı' });
});

// Ürün arama route'u
app.get('/api/products/search', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.json([]);
  }

  const searchResults = products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  res.json(searchResults);
});

// Tekil ürün detayı route'u
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Ürün bulunamadı' });
  }
  res.json(product);
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Geçersiz e-posta veya şifre'
    });
  }
});

app.post('/api/auth/signup', (req, res) => {
  const { email, password } = req.body;
  
  // Email kontrolü
  if (users.some(u => u.email === email)) {
    return res.status(400).json({
      success: false,
      message: 'Bu e-posta adresi zaten kullanımda'
    });
  }
  
  // Yeni kullanıcı oluştur
  const newUser = {
    id: users.length + 1,
    email,
    password,
    name: email.split('@')[0] // Basit bir isim oluşturma
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    }
  });
});

// Siparişler route'u
app.get('/api/orders', (req, res) => {
  // Gerçek uygulamada kullanıcı ID'sine göre filtreleme yapılmalı
  res.json(orders);
});

// Değerlendirmeler route'u
app.get('/api/reviews', (req, res) => {
  // Gerçek uygulamada kullanıcı ID'sine göre filtreleme yapılmalı
  res.json(reviews);
});

app.post('/api/products/:id/reviews', (req, res) => {
  const { id } = req.params;
  const { rating, comment, user, date } = req.body;

  const product = products.find(p => p.id === parseInt(id));
  if (!product) {
    return res.status(404).json({ success: false, message: 'Ürün bulunamadı' });
  }

  const newReview = {
    id: product.reviews.length + 1,
    user,
    rating,
    comment,
    date
  };

  product.reviews.push(newReview);

  // Ürünün ortalama puanını güncelle
  const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
  product.rating = (totalRating / product.reviews.length).toFixed(1);

  res.json({ success: true, product });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 