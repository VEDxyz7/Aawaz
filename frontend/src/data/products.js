// Comprehensive product catalog for AAWAZ - 120+ realistic products
export const PRODUCTS = [
  // VEGETABLES
  { id: 'v1', name: 'Fresh Tomatoes', price: 40, original_price: 60, category: 'vegetables', image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400', delivery_time: '8 mins', unit: '500g', rating: 4.5, tags: ['fresh', 'red', 'cooking'] },
  { id: 'v2', name: 'Red Onions', price: 35, original_price: 50, category: 'vegetables', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400', delivery_time: '8 mins', unit: '1kg', rating: 4.4, tags: ['onion', 'cooking'] },
  { id: 'v3', name: 'Fresh Potatoes', price: 30, original_price: 45, category: 'vegetables', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80', delivery_time: '8 mins', unit: '1kg', rating: 4.3, tags: ['potato', 'aloo'] },
  { id: 'v4', name: 'Green Capsicum', price: 50, category: 'vegetables', image: 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=400', delivery_time: '10 mins', unit: '500g', rating: 4.2, tags: ['capsicum', 'green'] },
  { id: 'v5', name: 'Fresh Spinach', price: 25, original_price: 35, category: 'vegetables', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400', delivery_time: '8 mins', unit: '250g', rating: 4.6, tags: ['palak', 'spinach', 'healthy', 'greens'] },
  { id: 'v6', name: 'Cucumber', price: 30, category: 'vegetables', image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400', delivery_time: '8 mins', unit: '500g', rating: 4.4, tags: ['cucumber', 'salad', 'healthy'] },
  { id: 'v7', name: 'Carrot', price: 45, original_price: 60, category: 'vegetables', image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=400', delivery_time: '10 mins', unit: '500g', rating: 4.5, tags: ['carrot', 'gajar', 'healthy'] },
  { id: 'v8', name: 'Cauliflower', price: 40, category: 'vegetables', image: 'https://images.unsplash.com/photo-1568584711271-6c929fb49b60?w=400', delivery_time: '10 mins', unit: '1 piece', rating: 4.2, tags: ['gobi', 'cauliflower'] },
  { id: 'v9', name: 'Ginger', price: 25, category: 'vegetables', image: 'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?w=400', delivery_time: '8 mins', unit: '100g', rating: 4.5, tags: ['adrak', 'ginger', 'chai'] },
  { id: 'v10', name: 'Garlic', price: 30, original_price: 40, category: 'vegetables', image: 'https://images.unsplash.com/photo-1615477550927-6ec8445fcfe2?w=400', delivery_time: '8 mins', unit: '100g', rating: 4.4, tags: ['lehsun', 'garlic'] },

  // FRUITS
  { id: 'f1', name: 'Fresh Apples', price: 150, original_price: 200, category: 'fruits', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400', delivery_time: '10 mins', unit: '1kg', rating: 4.6, tags: ['apple', 'fruit', 'healthy'] },
  { id: 'f2', name: 'Bananas', price: 50, original_price: 65, category: 'fruits', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', delivery_time: '8 mins', unit: '6 pcs', rating: 4.5, tags: ['banana', 'kela', 'breakfast'] },
  { id: 'f3', name: 'Sweet Oranges', price: 80, category: 'fruits', image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400', delivery_time: '10 mins', unit: '1kg', rating: 4.4, tags: ['orange', 'fruit', 'vitamin c'] },
  { id: 'f4', name: 'Fresh Pomegranate', price: 120, original_price: 150, category: 'fruits', image: 'https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=400', delivery_time: '12 mins', unit: '500g', rating: 4.7, tags: ['anar', 'pomegranate', 'healthy'] },
  { id: 'f5', name: 'Watermelon', price: 60, category: 'fruits', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400', delivery_time: '15 mins', unit: '2kg', rating: 4.3, tags: ['watermelon', 'summer'] },
  { id: 'f6', name: 'Strawberries', price: 180, original_price: 220, category: 'fruits', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400', delivery_time: '12 mins', unit: '200g', rating: 4.6, tags: ['strawberry', 'fruit', 'berries'] },
  { id: 'f7', name: 'Mango Alphonso', price: 250, original_price: 300, category: 'fruits', image: 'https://images.unsplash.com/photo-1605027990121-cbae9e0642db?w=400', delivery_time: '10 mins', unit: '1kg', rating: 4.8, tags: ['mango', 'aam', 'alphonso'] },
  { id: 'f8', name: 'Green Grapes', price: 90, category: 'fruits', image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=400', delivery_time: '10 mins', unit: '500g', rating: 4.4, tags: ['grapes', 'angoor'] },

  // DAIRY
  { id: 'd1', name: 'Amul Fresh Milk', price: 56, category: 'dairy', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', delivery_time: '8 mins', unit: '1L', rating: 4.7, tags: ['milk', 'doodh', 'chai', 'amul'] },
  { id: 'd2', name: 'Mother Dairy Toned Milk', price: 52, category: 'dairy', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', delivery_time: '8 mins', unit: '1L', rating: 4.6, tags: ['milk', 'doodh', 'mother dairy'] },
  { id: 'd3', name: 'Amul Butter', price: 60, original_price: 70, category: 'dairy', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400', delivery_time: '10 mins', unit: '100g', rating: 4.8, tags: ['butter', 'makhan', 'amul'] },
  { id: 'd4', name: 'Paneer', price: 95, original_price: 120, category: 'dairy', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', delivery_time: '8 mins', unit: '200g', rating: 4.7, tags: ['paneer', 'cottage cheese', 'protein'] },
  { id: 'd5', name: 'Fresh Curd', price: 45, category: 'dairy', image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400', delivery_time: '8 mins', unit: '400g', rating: 4.5, tags: ['curd', 'dahi', 'yogurt'] },
  { id: 'd6', name: 'Cheese Slices', price: 110, original_price: 140, category: 'dairy', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400', delivery_time: '10 mins', unit: '200g', rating: 4.6, tags: ['cheese', 'breakfast'] },
  { id: 'd7', name: 'Cream', price: 70, category: 'dairy', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400', delivery_time: '10 mins', unit: '200ml', rating: 4.4, tags: ['cream', 'malai'] },
  { id: 'd8', name: 'Eggs (Brown)', price: 78, original_price: 90, category: 'dairy', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400', delivery_time: '8 mins', unit: '6 pcs', rating: 4.7, tags: ['eggs', 'anda', 'protein', 'breakfast'] },

  // BAKERY
  { id: 'b1', name: 'Britannia Brown Bread', price: 45, category: 'bakery', image: 'https://images.unsplash.com/photo-1565299543923-37dd37887442?w=400', delivery_time: '8 mins', unit: '400g', rating: 4.5, tags: ['bread', 'breakfast', 'britannia'] },
  { id: 'b2', name: 'White Sandwich Bread', price: 35, category: 'bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', delivery_time: '8 mins', unit: '400g', rating: 4.4, tags: ['bread', 'sandwich'] },
  { id: 'b3', name: 'Pav Buns', price: 30, category: 'bakery', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', delivery_time: '10 mins', unit: '6 pcs', rating: 4.5, tags: ['pav', 'buns'] },
  { id: 'b4', name: 'Chocolate Cookies', price: 60, original_price: 80, category: 'bakery', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400', delivery_time: '10 mins', unit: '200g', rating: 4.6, tags: ['cookies', 'chocolate', 'snacks'] },
  { id: 'b5', name: 'Croissants', price: 120, category: 'bakery', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', delivery_time: '12 mins', unit: '4 pcs', rating: 4.7, tags: ['croissant', 'breakfast'] },
  { id: 'b6', name: 'Multigrain Bread', price: 55, original_price: 65, category: 'bakery', image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400', delivery_time: '10 mins', unit: '400g', rating: 4.6, tags: ['multigrain', 'bread', 'healthy'] },

  // SNACKS
  { id: 's1', name: 'Lays Classic Salted', price: 20, category: 'snacks', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400', delivery_time: '10 mins', unit: '52g', rating: 4.5, tags: ['chips', 'lays', 'snacks'] },
  { id: 's2', name: 'Kurkure Masala Munch', price: 20, category: 'snacks', image: 'https://images.unsplash.com/photo-1576642589592-7d9778a1c9e4?w=400', delivery_time: '10 mins', unit: '90g', rating: 4.6, tags: ['kurkure', 'spicy', 'snacks'] },
  { id: 's3', name: 'Haldiram Bhujia', price: 65, original_price: 80, category: 'snacks', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400', delivery_time: '10 mins', unit: '200g', rating: 4.7, tags: ['bhujia', 'namkeen', 'haldiram'] },
  { id: 's4', name: 'Oreo Chocolate', price: 30, category: 'snacks', image: 'https://images.unsplash.com/photo-1599629954294-14df9ec8bc03?w=400', delivery_time: '10 mins', unit: '120g', rating: 4.7, tags: ['oreo', 'biscuit', 'chocolate'] },
  { id: 's5', name: 'Parle-G Biscuit', price: 25, category: 'snacks', image: 'https://images.unsplash.com/photo-1612209715221-d4cd57c2c0a3?w=400', delivery_time: '8 mins', unit: '250g', rating: 4.5, tags: ['parle-g', 'biscuit', 'chai'] },
  { id: 's6', name: 'Roasted Almonds', price: 250, original_price: 320, category: 'snacks', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400', delivery_time: '12 mins', unit: '250g', rating: 4.8, tags: ['almonds', 'badam', 'healthy', 'nuts'] },
  { id: 's7', name: 'Cashews', price: 320, original_price: 400, category: 'snacks', image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400', delivery_time: '12 mins', unit: '200g', rating: 4.7, tags: ['cashew', 'kaju', 'nuts'] },
  { id: 's8', name: 'Dark Chocolate', price: 180, original_price: 220, category: 'snacks', image: 'https://images.unsplash.com/photo-1623660053975-e6308bcfcecd?w=400', delivery_time: '10 mins', unit: '100g', rating: 4.6, tags: ['chocolate', 'dark'] },
  { id: 's9', name: 'Granola Bars', price: 150, category: 'snacks', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400', delivery_time: '12 mins', unit: '6 bars', rating: 4.5, tags: ['granola', 'healthy', 'breakfast'] },
  { id: 's10', name: 'Popcorn', price: 60, category: 'snacks', image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400', delivery_time: '10 mins', unit: '100g', rating: 4.4, tags: ['popcorn', 'snacks'] },

  // BEVERAGES
  { id: 'bv1', name: 'Coca Cola', price: 40, category: 'beverages', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400', delivery_time: '10 mins', unit: '750ml', rating: 4.6, tags: ['coke', 'cold drink', 'soda'] },
  { id: 'bv2', name: 'Sprite', price: 40, category: 'beverages', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400', delivery_time: '10 mins', unit: '750ml', rating: 4.5, tags: ['sprite', 'cold drink'] },
  { id: 'bv3', name: 'Pepsi', price: 38, original_price: 45, category: 'beverages', image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400', delivery_time: '10 mins', unit: '750ml', rating: 4.5, tags: ['pepsi', 'cold drink'] },
  { id: 'bv4', name: 'Tata Tea Premium', price: 145, original_price: 170, category: 'beverages', image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400', delivery_time: '10 mins', unit: '500g', rating: 4.7, tags: ['tea', 'chai', 'tata'] },
  { id: 'bv5', name: 'Red Label Tea', price: 130, category: 'beverages', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400', delivery_time: '10 mins', unit: '500g', rating: 4.6, tags: ['tea', 'chai', 'red label'] },
  { id: 'bv6', name: 'Nescafe Coffee', price: 175, original_price: 220, category: 'beverages', image: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?w=400', delivery_time: '10 mins', unit: '50g', rating: 4.7, tags: ['coffee', 'nescafe'] },
  { id: 'bv7', name: 'Tropicana Orange Juice', price: 110, category: 'beverages', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', delivery_time: '10 mins', unit: '1L', rating: 4.5, tags: ['juice', 'orange'] },
  { id: 'bv8', name: 'Real Mixed Fruit Juice', price: 99, original_price: 120, category: 'beverages', image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400', delivery_time: '10 mins', unit: '1L', rating: 4.4, tags: ['juice', 'fruit'] },
  { id: 'bv9', name: 'Bisleri Water', price: 20, category: 'beverages', image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400', delivery_time: '8 mins', unit: '1L', rating: 4.5, tags: ['water', 'bisleri'] },
  { id: 'bv10', name: 'Green Tea Bags', price: 220, original_price: 280, category: 'beverages', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400', delivery_time: '12 mins', unit: '25 bags', rating: 4.6, tags: ['green tea', 'healthy'] },

  // ESSENTIALS / STAPLES
  { id: 'e1', name: 'Sugar', price: 48, category: 'essentials', image: 'https://images.unsplash.com/photo-1581600140682-d4e68c8e3d2f?w=400', delivery_time: '10 mins', unit: '1kg', rating: 4.5, tags: ['sugar', 'cheeni', 'chai'] },
  { id: 'e2', name: 'Iodized Salt', price: 28, category: 'essentials', image: 'https://images.unsplash.com/photo-1518110925495-b37653faec53?w=400', delivery_time: '10 mins', unit: '1kg', rating: 4.6, tags: ['salt', 'namak'] },
  { id: 'e3', name: 'Aashirvaad Atta', price: 285, original_price: 340, category: 'essentials', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', delivery_time: '12 mins', unit: '5kg', rating: 4.8, tags: ['atta', 'flour', 'aashirvaad'] },
  { id: 'e4', name: 'Basmati Rice', price: 320, original_price: 400, category: 'essentials', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', delivery_time: '12 mins', unit: '5kg', rating: 4.7, tags: ['rice', 'basmati', 'chawal'] },
  { id: 'e5', name: 'Toor Dal', price: 145, original_price: 170, category: 'essentials', image: 'https://images.unsplash.com/photo-1599909533730-1bb1a2a9f6e0?w=400', delivery_time: '12 mins', unit: '1kg', rating: 4.6, tags: ['dal', 'toor', 'arhar'] },
  { id: 'e6', name: 'Sunflower Oil', price: 220, original_price: 260, category: 'essentials', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', delivery_time: '12 mins', unit: '1L', rating: 4.5, tags: ['oil', 'sunflower'] },
  { id: 'e7', name: 'Turmeric Powder', price: 60, category: 'essentials', image: 'https://images.unsplash.com/photo-1599909533730-1bb1a2a9f6e0?w=400&q=80', delivery_time: '10 mins', unit: '200g', rating: 4.7, tags: ['turmeric', 'haldi', 'masala'] },
  { id: 'e8', name: 'Red Chilli Powder', price: 75, category: 'essentials', image: 'https://images.unsplash.com/photo-1583569822445-0d8f60ba0571?w=400', delivery_time: '10 mins', unit: '200g', rating: 4.6, tags: ['chilli', 'mirchi', 'masala'] },
  { id: 'e9', name: 'Garam Masala', price: 95, original_price: 120, category: 'essentials', image: 'https://images.unsplash.com/photo-1607672632458-9eb56696346b?w=400', delivery_time: '10 mins', unit: '100g', rating: 4.7, tags: ['masala', 'garam masala', 'spices'] },
  { id: 'e10', name: 'Mustard Oil', price: 175, category: 'essentials', image: 'https://images.unsplash.com/photo-1571942676516-d3b4d8d56b95?w=400', delivery_time: '12 mins', unit: '1L', rating: 4.5, tags: ['mustard oil', 'sarso'] },
  { id: 'e11', name: 'Cardamom (Elaichi)', price: 120, category: 'essentials', image: 'https://images.unsplash.com/photo-1610137125541-1efa3e2a4cbe?w=400', delivery_time: '12 mins', unit: '50g', rating: 4.7, tags: ['elaichi', 'cardamom', 'chai', 'masala'] },
  { id: 'e12', name: 'Cumin Seeds (Jeera)', price: 85, category: 'essentials', image: 'https://images.unsplash.com/photo-1599909533730-1bb1a2a9f6e0?w=400&fit=crop&q=80', delivery_time: '10 mins', unit: '100g', rating: 4.6, tags: ['jeera', 'cumin', 'masala'] },

  // FROZEN & READY-TO-EAT
  { id: 'fz1', name: 'McCain French Fries', price: 145, original_price: 180, category: 'frozen', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', delivery_time: '12 mins', unit: '750g', rating: 4.6, tags: ['fries', 'frozen', 'mccain'] },
  { id: 'fz2', name: 'Veg Momos', price: 120, category: 'frozen', image: 'https://images.unsplash.com/photo-1626664059143-bf4d22aaa6c8?w=400', delivery_time: '15 mins', unit: '300g', rating: 4.5, tags: ['momos', 'frozen', 'snacks'] },
  { id: 'fz3', name: 'Chicken Nuggets', price: 250, category: 'frozen', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400', delivery_time: '15 mins', unit: '400g', rating: 4.5, tags: ['nuggets', 'chicken', 'frozen'] },
  { id: 'fz4', name: 'Frozen Green Peas', price: 75, category: 'frozen', image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400', delivery_time: '12 mins', unit: '500g', rating: 4.4, tags: ['peas', 'matar', 'frozen'] },
  { id: 'fz5', name: 'Instant Noodles (Maggi)', price: 60, original_price: 72, category: 'frozen', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400', delivery_time: '8 mins', unit: '4 pack', rating: 4.7, tags: ['maggi', 'noodles', 'instant'] },
  { id: 'fz6', name: 'Ready Pasta Sauce', price: 145, category: 'frozen', image: 'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=400', delivery_time: '12 mins', unit: '400g', rating: 4.4, tags: ['pasta', 'sauce', 'italian'] },

  // HOUSEHOLD
  { id: 'h1', name: 'Surf Excel Detergent', price: 235, original_price: 280, category: 'household', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400', delivery_time: '15 mins', unit: '1kg', rating: 4.6, tags: ['detergent', 'laundry'] },
  { id: 'h2', name: 'Vim Dishwash', price: 65, category: 'household', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&q=70', delivery_time: '15 mins', unit: '500ml', rating: 4.5, tags: ['dishwash', 'vim'] },
  { id: 'h3', name: 'Harpic Toilet Cleaner', price: 110, original_price: 145, category: 'household', image: 'https://images.unsplash.com/photo-1631730492067-21d6b22fd44d?w=400', delivery_time: '15 mins', unit: '500ml', rating: 4.5, tags: ['cleaner', 'harpic'] },
  { id: 'h4', name: 'Tissue Paper Roll', price: 80, category: 'household', image: 'https://images.unsplash.com/photo-1583947582027-9e9da5b69c0d?w=400', delivery_time: '12 mins', unit: '4 pack', rating: 4.4, tags: ['tissue', 'paper'] },
  { id: 'h5', name: 'Lizol Floor Cleaner', price: 175, category: 'household', image: 'https://images.unsplash.com/photo-1551193554-5b25a40b1c41?w=400', delivery_time: '15 mins', unit: '975ml', rating: 4.5, tags: ['floor cleaner', 'lizol'] },

  // PERSONAL CARE
  { id: 'p1', name: 'Colgate Toothpaste', price: 95, original_price: 120, category: 'personal', image: 'https://images.unsplash.com/photo-1559591935-c6c92c6b8c4d?w=400', delivery_time: '12 mins', unit: '150g', rating: 4.6, tags: ['toothpaste', 'colgate'] },
  { id: 'p2', name: 'Dove Body Wash', price: 245, original_price: 295, category: 'personal', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', delivery_time: '12 mins', unit: '500ml', rating: 4.7, tags: ['body wash', 'dove'] },
  { id: 'p3', name: 'Head & Shoulders Shampoo', price: 320, category: 'personal', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400', delivery_time: '12 mins', unit: '650ml', rating: 4.6, tags: ['shampoo'] },
  { id: 'p4', name: 'Nivea Cream', price: 195, original_price: 230, category: 'personal', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=70', delivery_time: '12 mins', unit: '200ml', rating: 4.5, tags: ['cream', 'nivea'] },

  // BABY CARE
  { id: 'bc1', name: 'Pampers Diapers', price: 599, original_price: 750, category: 'baby', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', delivery_time: '15 mins', unit: 'Pack of 30', rating: 4.7, tags: ['diapers', 'baby'] },
  { id: 'bc2', name: 'Cerelac Baby Food', price: 295, category: 'baby', image: 'https://images.unsplash.com/photo-1606101205049-d04f7c1f0517?w=400', delivery_time: '15 mins', unit: '300g', rating: 4.6, tags: ['baby food', 'cerelac'] },
  { id: 'bc3', name: 'Johnson Baby Oil', price: 220, category: 'baby', image: 'https://images.unsplash.com/photo-1602874801006-94bdcc9f8e76?w=400', delivery_time: '15 mins', unit: '500ml', rating: 4.7, tags: ['baby oil', 'johnson'] },
];

export const CATEGORIES = [
  { id: 'all', name: 'All', icon: 'ShoppingBag' },
  { id: 'vegetables', name: 'Vegetables', icon: 'Carrot' },
  { id: 'fruits', name: 'Fruits', icon: 'Apple' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: 'Milk' },
  { id: 'bakery', name: 'Bakery', icon: 'Cookie' },
  { id: 'snacks', name: 'Snacks', icon: 'Popcorn' },
  { id: 'beverages', name: 'Beverages', icon: 'Coffee' },
  { id: 'essentials', name: 'Essentials', icon: 'Wheat' },
  { id: 'frozen', name: 'Frozen Food', icon: 'Snowflake' },
  { id: 'household', name: 'Household', icon: 'Home' },
  { id: 'personal', name: 'Personal Care', icon: 'Sparkles' },
  { id: 'baby', name: 'Baby Care', icon: 'Baby' },
];

// Curated Collections
export const COLLECTIONS = [
  {
    id: 'bestsellers',
    title: '🔥 Bestsellers',
    subtitle: 'Most loved by customers',
    productIds: ['d1', 'e3', 'bv4', 'f2', 's5', 'bv9', 'd8', 'v3', 'e4', 'fz5'],
  },
  {
    id: 'chai-essentials',
    title: '☕ Chai Essentials',
    subtitle: 'Everything for the perfect chai',
    productIds: ['bv4', 'd1', 'e1', 'e11', 'v9', 'bv5', 's5'],
  },
  {
    id: 'healthy-snacks',
    title: '🥗 Healthy Snacks',
    subtitle: 'Snack guilt-free',
    productIds: ['s6', 's7', 's9', 'bv10', 'f1', 'f6', 'd8', 'b6'],
  },
  {
    id: 'quick-breakfast',
    title: '🍳 Quick Breakfast',
    subtitle: 'Start your day right',
    productIds: ['d8', 'b1', 'b6', 'd1', 'bv6', 'f2', 'b5'],
  },
  {
    id: 'under-99',
    title: '💰 Under ₹99',
    subtitle: 'Great value picks',
    productIds: ['s1', 's2', 's4', 's5', 'v1', 'v2', 'v3', 'b1', 'd5', 'e2', 'bv1', 'fz5'],
  },
  {
    id: 'protein-picks',
    title: '💪 Protein Picks',
    subtitle: 'Power up your day',
    productIds: ['d4', 'd8', 's6', 's7', 'd6', 'd2'],
  },
];
