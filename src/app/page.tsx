'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, BookOpen, MessageCircle, Calendar, TrendingUp, 
  Users, ChevronRight, Menu, X, Play, Download, Check,
  AlertTriangle, Lightbulb, Target, Heart, Globe, Home,
  DollarSign, Clock, Award, Zap, ExternalLink, Copy,
  ChevronDown, ChevronUp, Share2, Facebook, Instagram,
  Linkedin, Twitter, ArrowRight, Eye, EyeOff, Sparkles
} from 'lucide-react'

// Types
interface Product {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  coverage: string
  minCoverage: number
  maxCoverage: number
  currency: string
  features: string[]
  benefits: { title: string; desc: string }[]
  idealFor: string[]
  pricing: { plan: string; annual: string; coverage: string }[]
  advantages: string[]
  disadvantages: string[]
  category: string
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

interface SpielStep {
  id: string
  title: string
  script: string
  context: string
  category: string
  tips: string[]
}

interface MarketStat {
  id: string
  label: string
  value: string
  description: string
  year: number
  category: string
}

interface RoadmapItem {
  id: string
  title: string
  description: string
  phase: string
  isCompleted: boolean
}

interface Misconception {
  id: string
  myth: string
  reality: string
  explanation: string
  category: string
}

interface PresentationSlide {
  id: string
  title: string
  content: string
  section: string
}

interface CalendarEvent {
  id: string
  title: string
  description: string | null
  date: string
  type: string
}

// Navigation tabs
const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'products', label: 'Products', icon: Shield },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'spiels', label: 'Spiels', icon: MessageCircle },
  { id: 'roadmap', label: 'Roadmap', icon: Target },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'presentation', label: 'Deck', icon: Play },
]

export default function PacificCrossHub() {
  const [activeTab, setActiveTab] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [spiels, setSpiels] = useState<SpielStep[]>([])
  const [stats, setStats] = useState<MarketStat[]>([])
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([])
  const [misconceptions, setMisconceptions] = useState<Misconception[]>([])
  const [slides, setSlides] = useState<PresentationSlide[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [expandedSpiel, setExpandedSpiel] = useState<string | null>(null)
  const [activeProduct, setActiveProduct] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [copiedScript, setCopiedScript] = useState<string | null>(null)

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, faqsRes, spielsRes, statsRes, roadmapRes, misconceptionsRes, slidesRes, eventsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/faqs'),
          fetch('/api/spiels'),
          fetch('/api/stats'),
          fetch('/api/roadmap'),
          fetch('/api/misconceptions'),
          fetch('/api/slides'),
          fetch('/api/events'),
        ])
        
        const productsData = await productsRes.json()
        const faqsData = await faqsRes.json()
        const spielsData = await spielsRes.json()
        const statsData = await statsRes.json()
        const roadmapData = await roadmapRes.json()
        const misconceptionsData = await misconceptionsRes.json()
        const slidesData = await slidesRes.json()
        const eventsData = await eventsRes.json()
        
        setProducts(productsData)
        setFaqs(faqsData)
        setSpiels(spielsData)
        setStats(statsData)
        setRoadmap(roadmapData)
        setMisconceptions(misconceptionsData)
        setSlides(slidesData)
        setEvents(eventsData)
        if (productsData.length > 0) {
          setActiveProduct(productsData[0].slug)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const toggleRoadmapItem = async (id: string, isCompleted: boolean) => {
    try {
      await fetch('/api/roadmap', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isCompleted: !isCompleted })
      })
      setRoadmap(roadmap.map(item => 
        item.id === id ? { ...item, isCompleted: !isCompleted } : item
      ))
    } catch (error) {
      console.error('Error updating roadmap:', error)
    }
  }

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedScript(id)
    setTimeout(() => setCopiedScript(null), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-bold uppercase tracking-wider">Loading...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b-4 border-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-black uppercase tracking-tight">PACIFIC CROSS</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Advisor Hub</p>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 font-bold uppercase text-sm tracking-wider transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t-2 border-primary overflow-hidden"
            >
              <nav className="p-4 grid grid-cols-2 gap-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`px-4 py-3 font-bold uppercase text-sm tracking-wider flex items-center gap-2 justify-center ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-8"
            >
              {/* Hero Section */}
              <section className="max-w-7xl mx-auto px-4 mb-12">
                <div className="brutal-card bg-card p-8 md:p-12">
                  <div className="max-w-3xl">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="inline-block px-4 py-2 bg-accent text-white font-bold uppercase text-sm tracking-wider mb-4">
                        New Advisor? Start Here
                      </span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
                      YOUR JOURNEY AS A{' '}
                      <span className="text-accent">TRUSTED ADVISOR</span>{' '}
                      STARTS NOW
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                      Welcome to Pacific Cross Advisor Hub. Learn how to protect families, 
                      build your business, and make a real impact in the Philippines where 
                      insurance penetration is only <strong>1.78%</strong>.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => setActiveTab('products')}
                        className="brutal-btn brutal-btn-accent px-6 py-3 flex items-center gap-2"
                      >
                        EXPLORE PRODUCTS
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setActiveTab('learn')}
                        className="brutal-btn px-6 py-3 flex items-center gap-2"
                      >
                        START LEARNING
                        <BookOpen className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Stats Marquee */}
              <section className="bg-primary text-primary-foreground py-4 overflow-hidden mb-12">
                <div className="flex animate-marquee whitespace-nowrap">
                  {[...stats, ...stats].map((stat, i) => (
                    <div key={i} className="mx-8 flex items-center gap-4">
                      <span className="text-3xl font-black">{stat.value}</span>
                      <span className="text-sm uppercase tracking-wider opacity-80">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Stats */}
              <section className="max-w-7xl mx-auto px-4 mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.slice(0, 4).map((stat, i) => (
                    <motion.div
                      key={stat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="brutal-card bg-card p-6 text-center"
                    >
                      <div className="text-3xl md:text-4xl font-black text-accent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm uppercase tracking-wider font-bold">
                        {stat.label}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {stat.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Products Preview */}
              <section className="max-w-7xl mx-auto px-4 mb-12">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6">
                  OUR PRODUCTS
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {products.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className={`brutal-card p-6 ${
                        product.category === 'premium' ? 'bg-gradient-to-br from-accent/10 to-yellow-500/10' : 'bg-card'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2 ${
                            product.category === 'premium' 
                              ? 'bg-accent text-white' 
                              : 'bg-primary text-primary-foreground'
                          }`}>
                            {product.category === 'premium' ? 'PREMIUM' : 'TOP-UP'}
                          </span>
                          <h4 className="text-2xl font-black uppercase">{product.name}</h4>
                          <p className="text-muted-foreground">{product.tagline}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground uppercase">Coverage</div>
                          <div className="text-xl font-black">{product.coverage}</div>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{product.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.idealFor.slice(0, 3).map((ideal, j) => (
                          <span key={j} className="px-2 py-1 bg-muted text-xs font-bold uppercase">
                            {ideal}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('products')
                          setActiveProduct(product.slug)
                        }}
                        className="brutal-btn px-4 py-2 text-sm flex items-center gap-2 w-full justify-center"
                      >
                        LEARN MORE
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Misconceptions */}
              <section className="max-w-7xl mx-auto px-4 mb-12">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-accent" />
                  MYTH BUSTERS
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {misconceptions.slice(0, 4).map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="brutal-card bg-card p-6"
                    >
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <X className="w-5 h-5 text-destructive" />
                          <span className="text-xs uppercase tracking-wider font-bold text-destructive">MYTH</span>
                        </div>
                        <p className="text-lg font-bold italic text-muted-foreground">"{item.myth}"</p>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Check className="w-5 h-5 text-green-500" />
                          <span className="text-xs uppercase tracking-wider font-bold text-green-500">REALITY</span>
                        </div>
                        <p className="text-lg font-bold">{item.reality}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.explanation}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* CTA Section */}
              <section className="max-w-7xl mx-auto px-4">
                <div className="brutal-card bg-primary text-primary-foreground p-8 md:p-12">
                  <div className="max-w-2xl">
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                      READY TO MAKE AN IMPACT?
                    </h3>
                    <p className="text-lg opacity-80 mb-6">
                      In a country with only 1.78% insurance penetration, you have the 
                      opportunity to protect millions of Filipino families. Start your 
                      journey today.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => setActiveTab('spiels')}
                        className="brutal-btn bg-accent text-white border-accent px-6 py-3 flex items-center gap-2"
                      >
                        PRACTICE SPIELS
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setActiveTab('roadmap')}
                        className="brutal-btn px-6 py-3 flex items-center gap-2"
                      >
                        VIEW ROADMAP
                        <Target className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-8"
            >
              <div className="max-w-7xl mx-auto px-4">
                {/* Product Tabs */}
                <div className="flex gap-2 mb-6">
                  {products.map(product => (
                    <button
                      key={product.id}
                      onClick={() => setActiveProduct(product.slug)}
                      className={`px-6 py-3 font-bold uppercase text-sm tracking-wider transition-all ${
                        activeProduct === product.slug
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>

                {/* Product Details */}
                {products.map(product => (
                  <AnimatePresence key={product.id}>
                    {activeProduct === product.slug && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        {/* Header */}
                        <div className={`brutal-card p-8 mb-6 ${
                          product.category === 'premium' 
                            ? 'bg-gradient-to-br from-accent/10 to-yellow-500/10' 
                            : 'bg-card'
                        }`}>
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div>
                              <span className={`inline-block px-4 py-2 text-sm font-bold uppercase tracking-wider mb-4 ${
                                product.category === 'premium'
                                  ? 'bg-accent text-white'
                                  : 'bg-primary text-primary-foreground'
                              }`}>
                                {product.category === 'premium' ? 'PREMIUM GLOBAL PLAN' : 'TOP-UP PLAN'}
                              </span>
                              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">
                                {product.name}
                              </h2>
                              <p className="text-xl text-muted-foreground">{product.tagline}</p>
                            </div>
                            <div className="md:text-right">
                              <div className="text-sm text-muted-foreground uppercase">Annual Coverage</div>
                              <div className="text-4xl font-black">{product.coverage}</div>
                            </div>
                          </div>
                          <p className="text-lg mt-6 max-w-3xl">{product.description}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          {/* Features */}
                          <div className="brutal-card bg-card p-6">
                            <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                              <Zap className="w-5 h-5 text-accent" />
                              KEY FEATURES
                            </h3>
                            <ul className="space-y-3">
                              {product.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Benefits */}
                          <div className="brutal-card bg-card p-6">
                            <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                              <Heart className="w-5 h-5 text-accent" />
                              CORE BENEFITS
                            </h3>
                            <div className="space-y-4">
                              {product.benefits.map((benefit, i) => (
                                <div key={i} className="border-l-4 border-accent pl-4">
                                  <h4 className="font-bold">{benefit.title}</h4>
                                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className="brutal-card bg-card p-6 mb-6">
                          <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-accent" />
                            PRICING TIERS
                          </h3>
                          <div className="grid md:grid-cols-3 gap-4">
                            {product.pricing.map((tier, i) => (
                              <div key={i} className={`p-4 border-3 border-primary ${i === 1 ? 'bg-accent text-white' : ''}`}>
                                <div className="text-sm uppercase tracking-wider font-bold mb-2">{tier.plan}</div>
                                <div className="text-2xl font-black mb-2">{tier.annual}</div>
                                <div className={`text-sm ${i === 1 ? 'opacity-80' : 'text-muted-foreground'}`}>
                                  {tier.coverage} coverage
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Ideal For */}
                        <div className="brutal-card bg-card p-6 mb-6">
                          <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-accent" />
                            PERFECT FOR
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {product.idealFor.map((ideal, i) => (
                              <span key={i} className="px-4 py-2 bg-muted font-bold">
                                {ideal}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Pros & Cons */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div className="brutal-card bg-card p-6">
                            <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-green-600 flex items-center gap-2">
                              <Check className="w-5 h-5" />
                              ADVANTAGES
                            </h3>
                            <ul className="space-y-3">
                              {product.advantages.map((adv, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                  <span className="text-sm">{adv}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="brutal-card bg-card p-6">
                            <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-amber-600 flex items-center gap-2">
                              <AlertTriangle className="w-5 h-5" />
                              THINGS TO CONSIDER
                            </h3>
                            <ul className="space-y-3">
                              {product.disadvantages.map((dis, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                                  <span className="text-sm">{dis}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* OFW Section */}
                        <div className="brutal-card bg-gradient-to-r from-accent/20 to-yellow-500/20 p-6">
                          <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-accent" />
                            FOR OFW FAMILIES
                          </h3>
                          <p className="mb-4">
                            {product.category === 'premium' 
                              ? 'Blue Royale is ideal for OFWs who travel frequently or want the flexibility to seek medical treatment anywhere in the world. Your overseas work deserves world-class protection.'
                              : 'FlexiShield provides affordable extra protection for families of OFWs. When your HMO runs out, FlexiShield steps in to protect your family\'s savings and your hard-earned remittances.'}
                          </p>
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                              <Heart className="w-5 h-5 text-accent" />
                              <span className="font-bold">Protect your family</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-5 h-5 text-accent" />
                              <span className="font-bold">Preserve your savings</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="w-5 h-5 text-accent" />
                              <span className="font-bold">Global coverage</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-8"
            >
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-black uppercase tracking-tight mb-6">
                  LEARNING CENTER
                </h2>

                {/* FAQ Section */}
                <div className="brutal-card bg-card p-6 mb-6">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-accent" />
                    FREQUENTLY ASKED QUESTIONS
                  </h3>
                  <div className="space-y-3">
                    {faqs.map(faq => (
                      <div key={faq.id} className="border-2 border-primary">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                          className="w-full p-4 flex items-center justify-between text-left font-bold"
                        >
                          <span>{faq.question}</span>
                          {expandedFaq === faq.id ? (
                            <ChevronUp className="w-5 h-5 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 flex-shrink-0" />
                          )}
                        </button>
                        <AnimatePresence>
                          {expandedFaq === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-muted-foreground border-t-2 border-primary">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Misconceptions */}
                <div className="brutal-card bg-card p-6 mb-6">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    COMMON MISCONCEPTIONS
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {misconceptions.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-2 border-primary p-4"
                      >
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <X className="w-4 h-4 text-destructive" />
                            <span className="text-xs uppercase tracking-wider font-bold text-destructive">MYTH</span>
                          </div>
                          <p className="font-bold italic text-muted-foreground text-sm">"{item.myth}"</p>
                        </div>
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-xs uppercase tracking-wider font-bold text-green-500">REALITY</span>
                          </div>
                          <p className="font-bold text-sm">{item.reality}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.explanation}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Market Stats */}
                <div className="brutal-card bg-card p-6">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    PHILIPPINE INSURANCE LANDSCAPE
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    {stats.map(stat => (
                      <div key={stat.id} className="text-center p-4 border-2 border-primary">
                        <div className="text-2xl font-black text-accent">{stat.value}</div>
                        <div className="text-sm font-bold uppercase">{stat.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-muted">
                    <h4 className="font-bold mb-2">THE OPPORTUNITY</h4>
                    <p className="text-sm text-muted-foreground">
                      With only 1.78% insurance penetration, the Philippines represents one of the 
                      most underserved insurance markets in Southeast Asia. The growing middle class, 
                      increasing health awareness, and rising medical costs create enormous demand 
                      for protection products. As an advisor, you're not just selling insurance — 
                      you're bridging a critical gap in financial security for millions of Filipino families.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'spiels' && (
            <motion.div
              key="spiels"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-8"
            >
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-black uppercase tracking-tight mb-2">
                  CONVERSATION SPIELS
                </h2>
                <p className="text-muted-foreground mb-6">
                  Master these scripts to handle any conversation naturally. Remember: it's not about 
                  memorizing, it's about understanding the flow.
                </p>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['all', 'opening', 'discovery', 'presentation', 'objection', 'closing'].map(cat => (
                    <button
                      key={cat}
                      className={`px-4 py-2 font-bold uppercase text-sm tracking-wider ${
                        cat === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Spiels */}
                <div className="space-y-4">
                  {spiels.map(spiel => (
                    <div key={spiel.id} className="brutal-card bg-card">
                      <button
                        onClick={() => setExpandedSpiel(expandedSpiel === spiel.id ? null : spiel.id)}
                        className="w-full p-4 flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                            spiel.category === 'opening' ? 'bg-blue-500 text-white' :
                            spiel.category === 'discovery' ? 'bg-green-500 text-white' :
                            spiel.category === 'presentation' ? 'bg-purple-500 text-white' :
                            spiel.category === 'objection' ? 'bg-amber-500 text-white' :
                            'bg-accent text-white'
                          }`}>
                            {spiel.category}
                          </span>
                          <span className="font-bold">{spiel.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground hidden md:block">{spiel.context}</span>
                          {expandedSpiel === spiel.id ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </button>
                      <AnimatePresence>
                        {expandedSpiel === spiel.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 border-t-2 border-primary">
                              <div className="bg-muted p-4 mb-4 relative group">
                                <p className="text-lg italic">"{spiel.script}"</p>
                                <button
                                  onClick={() => copyToClipboard(spiel.script, spiel.id)}
                                  className="absolute top-2 right-2 p-2 bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  {copiedScript === spiel.id ? (
                                    <Check className="w-4 h-4" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                              <div className="mb-4">
                                <h4 className="font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-accent" />
                                  WHEN TO USE
                                </h4>
                                <p className="text-sm text-muted-foreground">{spiel.context}</p>
                              </div>
                              {spiel.tips && spiel.tips.length > 0 && (
                                <div>
                                  <h4 className="font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4 text-accent" />
                                    DELIVERY TIPS
                                  </h4>
                                  <ul className="space-y-2">
                                    {spiel.tips.map((tip, i) => (
                                      <li key={i} className="flex items-start gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        {tip}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Tips Box */}
                <div className="brutal-card bg-accent/10 p-6 mt-6">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" />
                    PRO TIPS FOR SPIELS
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold mb-2">DO</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5" />
                          Personalize scripts with their name and situation
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5" />
                          Listen more than you talk
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5" />
                          Practice until it sounds natural
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5" />
                          Show genuine care and empathy
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">DON'T</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <X className="w-4 h-4 text-destructive mt-0.5" />
                          Read scripts verbatim like a robot
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="w-4 h-4 text-destructive mt-0.5" />
                          Push products before understanding needs
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="w-4 h-4 text-destructive mt-0.5" />
                          Use pressure tactics or guilt
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="w-4 h-4 text-destructive mt-0.5" />
                          Forget to follow up
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'roadmap' && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-8"
            >
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-black uppercase tracking-tight mb-2">
                  ADVISOR ROADMAP
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your step-by-step guide to becoming a successful insurance advisor. 
                  Track your progress and celebrate milestones.
                </p>

                {/* Progress Overview */}
                <div className="brutal-card bg-card p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black uppercase tracking-tight">YOUR PROGRESS</h3>
                    <span className="text-2xl font-black text-accent">
                      {roadmap.filter(r => r.isCompleted).length}/{roadmap.length}
                    </span>
                  </div>
                  <div className="w-full h-4 bg-muted border-2 border-primary">
                    <div 
                      className="h-full bg-accent transition-all duration-500"
                      style={{ width: `${(roadmap.filter(r => r.isCompleted).length / roadmap.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Roadmap Phases */}
                {['week1', 'week2', 'month1', 'month3', 'ongoing'].map(phase => {
                  const phaseItems = roadmap.filter(r => r.phase === phase)
                  const phaseNames: Record<string, string> = {
                    week1: 'WEEK 1: FOUNDATION',
                    week2: 'WEEK 2: ACTION',
                    month1: 'MONTH 1: BUILDING',
                    month3: 'MONTH 3: EXPANDING',
                    ongoing: 'ONGOING: GROWTH'
                  }
                  
                  return (
                    <div key={phase} className="mb-6">
                      <h3 className="text-lg font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className={`w-8 h-8 flex items-center justify-center text-sm ${
                          phaseItems.every(r => r.isCompleted) ? 'bg-green-500 text-white' : 'bg-muted'
                        }`}>
                          {phaseItems.filter(r => r.isCompleted).length}/{phaseItems.length}
                        </span>
                        {phaseNames[phase]}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {phaseItems.map(item => (
                          <div 
                            key={item.id} 
                            className={`brutal-card p-4 cursor-pointer transition-all ${
                              item.isCompleted ? 'bg-green-50 border-green-500' : 'bg-card'
                            }`}
                            onClick={() => toggleRoadmapItem(item.id, item.isCompleted)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-6 h-6 border-2 border-primary flex items-center justify-center flex-shrink-0 ${
                                item.isCompleted ? 'bg-green-500 border-green-500' : ''
                              }`}>
                                {item.isCompleted && <Check className="w-4 h-4 text-white" />}
                              </div>
                              <div>
                                <h4 className={`font-bold ${item.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                  {item.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-8"
            >
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-black uppercase tracking-tight mb-6">
                  CALENDAR & EVENTS
                </h2>

                {/* Mini Calendar */}
                <div className="brutal-card bg-card p-6 mb-6">
                  <h3 className="text-lg font-black uppercase tracking-tight mb-4">
                    {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()}
                  </h3>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="p-2 font-bold text-sm text-muted-foreground">{day}</div>
                    ))}
                    {Array.from({ length: 35 }, (_, i) => {
                      const today = new Date()
                      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
                      const startDate = new Date(firstDay)
                      startDate.setDate(startDate.getDate() - firstDay.getDay())
                      const currentDate = new Date(startDate)
                      currentDate.setDate(startDate.getDate() + i)
                      const isToday = currentDate.toDateString() === today.toDateString()
                      const hasEvent = events.some(e => 
                        new Date(e.date).toDateString() === currentDate.toDateString()
                      )
                      
                      return (
                        <div 
                          key={i} 
                          className={`p-2 text-sm ${
                            isToday ? 'bg-accent text-white font-bold' : 
                            hasEvent ? 'bg-muted font-bold' : ''
                          } ${currentDate.getMonth() !== today.getMonth() ? 'text-muted-foreground opacity-50' : ''}`}
                        >
                          {currentDate.getDate()}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="brutal-card bg-card p-6">
                  <h3 className="text-lg font-black uppercase tracking-tight mb-4">
                    UPCOMING EVENTS
                  </h3>
                  <div className="space-y-4">
                    {events.map(event => {
                      const eventDate = new Date(event.date)
                      const isPast = eventDate < new Date()
                      
                      return (
                        <div 
                          key={event.id} 
                          className={`flex items-start gap-4 p-4 border-2 border-primary ${
                            isPast ? 'opacity-50' : ''
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-2xl font-black">{eventDate.getDate()}</div>
                            <div className="text-xs uppercase tracking-wider">
                              {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-1 text-xs font-bold uppercase ${
                                event.type === 'training' ? 'bg-blue-500 text-white' :
                                event.type === 'deadline' ? 'bg-amber-500 text-white' :
                                event.type === 'event' ? 'bg-green-500 text-white' :
                                'bg-accent text-white'
                              }`}>
                                {event.type}
                              </span>
                              {event.isRecurring && (
                                <span className="text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  {event.recurrence}
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold">{event.title}</h4>
                            {event.description && (
                              <p className="text-sm text-muted-foreground">{event.description}</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'presentation' && (
            <motion.div
              key="presentation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-8"
            >
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-black uppercase tracking-tight mb-2">
                  PRESENTATION DECK
                </h2>
                <p className="text-muted-foreground mb-6">
                  Use this presentation for training sessions, client meetings, or sharing with prospects.
                </p>

                {/* Slide Navigation */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {slides.map((slide, i) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(i)}
                      className={`px-4 py-2 font-bold text-sm whitespace-nowrap ${
                        currentSlide === i 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {i + 1}. {slide.title}
                    </button>
                  ))}
                </div>

                {/* Slide Content */}
                <div className="brutal-card bg-card min-h-[400px] p-8 mb-6">
                  <div className="max-w-3xl mx-auto">
                    <h3 className="text-3xl font-black uppercase tracking-tight mb-6">
                      {slides[currentSlide]?.title}
                    </h3>
                    <div className="prose prose-lg">
                      {slides[currentSlide]?.content.split('\n').map((line, i) => {
                        if (line.startsWith('# ')) {
                          return <h1 key={i} className="text-2xl font-black mt-4 mb-2">{line.slice(2)}</h1>
                        }
                        if (line.startsWith('## ')) {
                          return <h2 key={i} className="text-xl font-bold mt-4 mb-2">{line.slice(3)}</h2>
                        }
                        if (line.startsWith('- ')) {
                          return <li key={i} className="ml-4">{line.slice(2)}</li>
                        }
                        if (line.startsWith('> ')) {
                          return <blockquote key={i} className="border-l-4 border-accent pl-4 italic my-4">{line.slice(2)}</blockquote>
                        }
                        if (line.trim()) {
                          return <p key={i} className="mb-2">{line}</p>
                        }
                        return null
                      })}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                    disabled={currentSlide === 0}
                    className="brutal-btn px-6 py-3 flex items-center gap-2 disabled:opacity-50"
                  >
                    PREVIOUS
                  </button>
                  <span className="text-lg font-bold">
                    {currentSlide + 1} / {slides.length}
                  </span>
                  <button
                    onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                    disabled={currentSlide === slides.length - 1}
                    className="brutal-btn px-6 py-3 flex items-center gap-2 disabled:opacity-50"
                  >
                    NEXT
                  </button>
                </div>

                {/* Download Button */}
                <div className="mt-6 text-center">
                  <button className="brutal-btn brutal-btn-accent px-8 py-4 inline-flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    DOWNLOAD PRESENTATION
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-primary bg-primary text-primary-foreground py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8" />
                <span className="font-black uppercase text-xl">Pacific Cross Hub</span>
              </div>
              <p className="text-sm opacity-80">
                Your comprehensive resource for becoming a trusted insurance advisor.
                Learn, practice, and grow with Pacific Cross.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://keystone.com.ph/learning-hub" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">Keystone Learning Hub <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="https://www.pacificcross.com.ph" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">Pacific Cross Philippines <ExternalLink className="w-3 h-3" /></a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-60">
            <p>Pacific Cross Advisor Hub — Built for advisors, by advisors.</p>
            <p className="mt-2">Helping protect Filipino families, one policy at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
