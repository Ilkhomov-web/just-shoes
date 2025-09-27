import { Box, Container, Grid, Typography, IconButton, Badge, Drawer, Stack, CircularProgress } from '@mui/material'
import React from 'react'
import Navbar from '../components/ui/Navbar'
import Filters from '../components/products/Filters'
import ProductGrid from '../components/products/ProductGrid'
import CategoryCard from '../components/products/CategoryCard'
import ProtectedRoute from '../../components/ProtectedRoute'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FilterListIcon from '@mui/icons-material/FilterList'
import Cart from '../components/products/Cart'

const index = () => {
  const [filters, setFilters] = React.useState({ price: [0, 250], sizes: [], colors: [], status: 'all', discountOnly: false, sort: 'relevance', category: 'all' })
  const [cartOpen, setCartOpen] = React.useState(false)
  const [filterOpen, setFilterOpen] = React.useState(false)
  const [cart, setCart] = React.useState([])
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [products, setProducts] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);
        
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = React.useMemo(() => {
    let result = products.filter(p => {
      const price = p.price * (1 - (p.discountPercent || 0) / 100)
      const inPrice = price >= filters.price[0] && price <= filters.price[1]
      const inSize = filters.sizes.length ? p.sizes.some(s => filters.sizes.includes(s)) : true
      const inColor = filters.colors.length ? p.colors?.some(c => filters.colors.includes(c)) : true
      const inStatus = filters.status === 'all' ? true : p.stockStatus === filters.status
      const inDiscount = filters.discountOnly ? (p.discountPercent || 0) > 0 : true
      const inCategory = selectedCategory === 'all' ? true : 
        selectedCategory === 'discounted' ? (p.discountPercent || 0) > 0 :
        p.category === selectedCategory
      return inPrice && inSize && inColor && inStatus && inDiscount && inCategory
    })

    if (filters.sort === 'price_low_high') {
      result = [...result].sort((a, b) => (a.price * (1 - (a.discountPercent||0)/100)) - (b.price * (1 - (b.discountPercent||0)/100)))
    } else if (filters.sort === 'price_high_low') {
      result = [...result].sort((a, b) => (b.price * (1 - (b.discountPercent||0)/100)) - (a.price * (1 - (a.discountPercent||0)/100)))
    } else if (filters.sort === 'discount') {
      result = [...result].sort((a, b) => (b.discountPercent||0) - (a.discountPercent||0))
    }
    return result
  }, [filters])

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))
  const clearCart = () => setCart([])

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#0a0a0a'
      }}>
        <CircularProgress sx={{ color: 'orange', mb: 2 }} />
        <Typography variant="h6" sx={{ color: 'white' }}>
          Loading products...
        </Typography>
      </Box>
    );
  }

  return (
    <ProtectedRoute>
      <Box sx={{
        minHeight: '100vh',
        backgroundColor: '#111',
        backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(255,170,0,0.20), transparent 35%), radial-gradient(circle at 80% 20%, rgba(255,80,0,0.14), transparent 35%), radial-gradient(circle at 50% 80%, rgba(255,170,0,0.12), transparent 40%)'
      }}>
        <Navbar />
        <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton onClick={() => setFilterOpen(true)} sx={{ color: 'white', display: { xs: 'inline-flex', md: 'none' } }}>
              <FilterListIcon />
            </IconButton>
            <IconButton onClick={() => setCartOpen(true)} sx={{ color: 'white' }}>
              <Badge color="error" badgeContent={cart.reduce((s, i) => s + i.qty, 0)}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Stack>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 700 }}>
            Categories
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ display: { xs: 'none', md: 'block' }, width: 300, flex: '0 0 300px' }}>
            <Filters values={filters} onChange={setFilters} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <ProductGrid products={filtered} onAddToCart={addToCart} />
          </Box>
        </Box>
      </Container>
      <Drawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        PaperProps={{ sx: { width: '85%', maxWidth: 420, bgcolor: '#111', color: 'white' } }}
      >
        <Box sx={{ p: 2 }}>
          <Filters values={filters} onChange={setFilters} />
        </Box>
      </Drawer>
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} items={cart} onRemove={removeFromCart} onClear={clearCart} />
      </Box>
    </ProtectedRoute>
  )
}

export default index