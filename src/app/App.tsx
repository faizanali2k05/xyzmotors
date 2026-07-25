import { useState, useCallback, useEffect } from "react";
import {
  Search, MapPin, Phone, Mail, ChevronDown, ChevronRight, Star,
  CheckCircle, Users, Award, Shield, Fuel, Settings2, Calendar,
  Gauge, ArrowRight, Clock, Menu, X, Building2, Calculator,
  Upload, FileText, Wrench, Heart, Share2, MessageCircle, Eye,
  Filter, Grid3X3, List, Plus, Minus, Camera, Check, Car,
  TrendingUp, BarChart3, Banknote, CircleCheck, PhoneCall,
  ChevronLeft, Wallet, BadgeCheck, Globe, Facebook,
  Instagram, Twitter, Youtube, Linkedin, ArrowUpRight,
  ThumbsUp, StarHalf, Headphones, Package, Navigation
} from "lucide-react";
import xyzLogo from "@/imports/image.png";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Page = "home" | "inventory" | "details" | "rental" | "sell" | "about" | "blog" | "contact";

interface Vehicle {
  id: number;
  make: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  mileage: number;
  transmission: "Automatic" | "Manual";
  fuel: "Petrol" | "Diesel" | "Hybrid" | "CNG";
  city: string;
  condition: "New" | "Used";
  bodyType: "Sedan" | "SUV" | "Hatchback" | "Pickup" | "Crossover";
  img: string;
  featured?: boolean;
  badge?: string;
  color?: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
let VEHICLES: Vehicle[] = [
  { id: 1, make: "Toyota", model: "Corolla", variant: "Grande X CVT-i", year: 2024, price: 4599000, mileage: 0, transmission: "Automatic", fuel: "Petrol", city: "Lahore", condition: "New", bodyType: "Sedan", img: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&h=380&fit=crop&auto=format", featured: true, badge: "Best Seller", color: "White" },
  { id: 2, make: "Honda", model: "Civic", variant: "RS Turbo", year: 2024, price: 5599000, mileage: 0, transmission: "Automatic", fuel: "Petrol", city: "Karachi", condition: "New", bodyType: "Sedan", img: "https://images.unsplash.com/photo-1619431856706-ca2cc58258f6?w=600&h=380&fit=crop&auto=format", featured: true, badge: "New Arrival", color: "White" },
  { id: 3, make: "KIA", model: "Sportage", variant: "AWD Alpha", year: 2024, price: 6999000, mileage: 0, transmission: "Automatic", fuel: "Petrol", city: "Islamabad", condition: "New", bodyType: "SUV", img: "https://images.unsplash.com/photo-1596429924638-d1f8a252df7d?w=600&h=380&fit=crop&auto=format", featured: true, badge: "Top Pick", color: "Silver" },
  { id: 4, make: "Toyota", model: "Fortuner", variant: "Sigma 4 2.7L", year: 2024, price: 14999000, mileage: 0, transmission: "Automatic", fuel: "Petrol", city: "Lahore", condition: "New", bodyType: "SUV", img: "https://images.unsplash.com/photo-1771904488909-9137431615c5?w=600&h=380&fit=crop&auto=format", featured: true, badge: "Luxury", color: "Black" },
  { id: 5, make: "Toyota", model: "Prado", variant: "TXL 3.0D", year: 2023, price: 22999000, mileage: 8500, transmission: "Automatic", fuel: "Diesel", city: "Islamabad", condition: "Used", bodyType: "SUV", img: "https://images.unsplash.com/photo-1618353482480-61ca5a9a7879?w=600&h=380&fit=crop&auto=format", featured: true, badge: "Premium", color: "Gray" },
  { id: 6, make: "MG", model: "HS", variant: "1.5T DCT", year: 2024, price: 7499000, mileage: 0, transmission: "Automatic", fuel: "Petrol", city: "Karachi", condition: "New", bodyType: "SUV", img: "https://images.unsplash.com/photo-1777175013217-36fa50584299?w=600&h=380&fit=crop&auto=format", featured: true, badge: "Hot Deal", color: "Black" },
  { id: 7, make: "Hyundai", model: "Tucson", variant: "AWD Ultimate", year: 2024, price: 6499000, mileage: 0, transmission: "Automatic", fuel: "Petrol", city: "Rawalpindi", condition: "New", bodyType: "SUV", img: "https://images.unsplash.com/photo-1585390062628-be8608aa7d83?w=600&h=380&fit=crop&auto=format", badge: "New", color: "Blue" },
  { id: 8, make: "Honda", model: "City", variant: "Aspire CVT", year: 2024, price: 3899000, mileage: 0, transmission: "Automatic", fuel: "Petrol", city: "Faisalabad", condition: "New", bodyType: "Sedan", img: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&h=380&fit=crop&auto=format&q=70", badge: "Value Pick", color: "Silver" },
  { id: 9, make: "Toyota", model: "Yaris", variant: "ATIV CVT", year: 2024, price: 3999000, mileage: 0, transmission: "Automatic", fuel: "Petrol", city: "Lahore", condition: "New", bodyType: "Sedan", img: "https://images.unsplash.com/photo-1663226894173-ae8f089b28ef?w=600&h=380&fit=crop&auto=format", color: "White" },
  { id: 10, make: "Hyundai", model: "Elantra", variant: "GLS Executive", year: 2024, price: 5199000, mileage: 0, transmission: "Automatic", fuel: "Petrol", city: "Karachi", condition: "New", bodyType: "Sedan", img: "https://images.unsplash.com/photo-1623346483743-b968a27ed34c?w=600&h=380&fit=crop&auto=format", color: "Gray" },
  { id: 11, make: "Suzuki", model: "Swift", variant: "GLX CVT", year: 2024, price: 2799000, mileage: 0, transmission: "Automatic", fuel: "Petrol", city: "Multan", condition: "New", bodyType: "Hatchback", img: "https://images.unsplash.com/photo-1663226894173-ae8f089b28ef?w=600&h=380&fit=crop", color: "Red" },
  { id: 12, make: "Suzuki", model: "Alto", variant: "VXL AGS", year: 2024, price: 1899000, mileage: 0, transmission: "Automatic", fuel: "Petrol", city: "Peshawar", condition: "New", bodyType: "Hatchback", img: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&h=380&fit=crop&q=60", color: "Blue" },
  { id: 13, make: "Suzuki", model: "Cultus", variant: "VXL", year: 2024, price: 2499000, mileage: 0, transmission: "Manual", fuel: "Petrol", city: "Sialkot", condition: "New", bodyType: "Hatchback", img: "https://images.unsplash.com/photo-1619431856706-ca2cc58258f6?w=600&h=380&fit=crop&q=60", color: "White" },
  { id: 14, make: "Suzuki", model: "Wagon R", variant: "VXL", year: 2024, price: 2299000, mileage: 0, transmission: "Automatic", fuel: "Petrol", city: "Lahore", condition: "New", bodyType: "Hatchback", img: "https://images.unsplash.com/photo-1663226894173-ae8f089b28ef?w=600&h=380&fit=crop&q=70", color: "Silver" },
  { id: 15, make: "Honda", model: "BR-V", variant: "S CVT", year: 2024, price: 4299000, mileage: 0, transmission: "Automatic", fuel: "Petrol", city: "Karachi", condition: "New", bodyType: "Crossover", img: "https://images.unsplash.com/photo-1596429924638-d1f8a252df7d?w=600&h=380&fit=crop&q=70", color: "White" },
  { id: 16, make: "Toyota", model: "Hilux Revo", variant: "G DCab 2.8D 4x4", year: 2024, price: 12999000, mileage: 0, transmission: "Automatic", fuel: "Diesel", city: "Islamabad", condition: "New", bodyType: "Pickup", img: "https://images.unsplash.com/photo-1618418721668-0d1f72aa4bab?w=600&h=380&fit=crop&auto=format", badge: "4x4", color: "White" },
  { id: 17, make: "Changan", model: "Oshan X7", variant: "1.5T AWD", year: 2024, price: 8499000, mileage: 0, transmission: "Automatic", fuel: "Petrol", city: "Lahore", condition: "New", bodyType: "SUV", img: "https://images.unsplash.com/photo-1585390062628-be8608aa7d83?w=600&h=380&fit=crop&q=70", color: "White" },
  { id: 18, make: "Haval", model: "H6", variant: "HEV", year: 2024, price: 8999000, mileage: 0, transmission: "Automatic", fuel: "Hybrid", city: "Karachi", condition: "New", bodyType: "SUV", img: "https://images.unsplash.com/photo-1596429924638-d1f8a252df7d?w=600&h=380&fit=crop&q=80", badge: "Hybrid", color: "Gray" },
];

const TESTIMONIALS = [
  { id: 1, name: "Ahsan Iqbal", city: "Lahore", rating: 5, text: "Exceptional experience from start to finish. The team at XYZ Motors made buying my Toyota Fortuner incredibly smooth. Transparent pricing with no hidden charges.", avatar: "AI", car: "Toyota Fortuner 2024" },
  { id: 2, name: "Sana Mahmood", city: "Karachi", rating: 5, text: "I was impressed by the professionalism and product knowledge of the staff. The purchasing process was quick and completely hassle free. Highly recommend!", avatar: "SM", car: "Honda Civic 2024" },
  { id: 3, name: "Farhan Khalid", city: "Islamabad", rating: 5, text: "XYZ Motors handled my car exchange seamlessly. Got a fair price for my old vehicle and a great deal on the new KIA Sportage. The entire process took just 2 days!", avatar: "FK", car: "KIA Sportage 2024" },
  { id: 4, name: "Rabia Noor", city: "Rawalpindi", rating: 4, text: "The rental service is excellent for those short business trips to Lahore. Clean, well maintained vehicles delivered right to my office. Will definitely use again.", avatar: "RN", car: "Toyota Corolla Rental" },
  { id: 5, name: "Usman Tariq", city: "Faisalabad", rating: 5, text: "Bought a used Toyota Prado and it was thoroughly inspected and certified before delivery. Zero issues after 6 months. The post sale service is also outstanding.", avatar: "UT", car: "Toyota Prado 2023" },
  { id: 6, name: "Nadia Riaz", city: "Multan", rating: 5, text: "The website helped me find the perfect car for my family. Got my vehicle delivered within 48 hours. Smooth process all the way.", avatar: "NR", car: "Hyundai Tucson 2024" },
];


const BANKS = [
  { name: "HBL", fullName: "Habib Bank Limited", rate: "22%", color: "#006633" },
  { name: "UBL", fullName: "United Bank Limited", rate: "23%", color: "#003580" },
  { name: "Meezan", fullName: "Meezan Bank", rate: "24%", color: "#C41E3A" },
  { name: "Alfalah", fullName: "Bank Alfalah", rate: "22.5%", color: "#004F9F" },
  { name: "MCB", fullName: "MCB Bank", rate: "23.5%", color: "#8B0000" },
  { name: "Faysal", fullName: "Faysal Bank", rate: "23%", color: "#FF6B00" },
];

const STATS = [
  { value: "8,500+", label: "Vehicles Sold" },
  { value: "12,000+", label: "Happy Customers" },
  { value: "18", label: "Years in Business" },
  { value: "6", label: "Cities in Pakistan" },
];

const RENTAL_PLANS = [
  { id: 1, type: "Daily", price: 6500, duration: "Per Day", vehicles: ["Toyota Corolla", "Honda City", "Suzuki Cultus"], features: ["Unlimited KMs (City)", "Driver Optional", "24/7 Support", "Clean & Sanitized"] },
  { id: 2, type: "Weekly", price: 38000, duration: "Per Week", vehicles: ["Toyota Corolla", "Honda Civic", "KIA Sportage"], features: ["800 KM Included", "Driver Optional", "24/7 Support", "Fuel Excluded"], popular: true },
  { id: 3, type: "Monthly", price: 130000, duration: "Per Month", vehicles: ["Toyota Corolla", "Honda Civic", "Toyota Fortuner"], features: ["3,000 KM Included", "Driver Included", "Maintenance Covered", "Full Insurance"] },
];

const TEAM = [
  { name: "Muhammad Imran", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face" },
  { name: "Tariq Mehmood", role: "General Manager", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" },
  { name: "Sara Ahmed", role: "Head of Operations", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face" },
  { name: "Bilal Hassan", role: "Fleet Manager", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" },
];

// ─── UTILITIES ────────────────────────────────────────────────────────────────
function formatPKR(amount: number): string {
  if (amount >= 10000000) return `Rs. ${(amount / 10000000).toFixed(2)} Crore`;
  if (amount >= 100000) return `Rs. ${(amount / 100000).toFixed(2)} Lakh`;
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

function calcEMI(principal: number, annualRate: number, months: number): number {
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, subtitle, light = false, center = false }: { eyebrow: string; title: string; subtitle?: string; light?: boolean; center?: boolean }) {
  return (
    <div className="mb-12">
      <span className={`text-xs font-semibold tracking-[0.2em] uppercase ${light ? "text-blue-300" : "text-accent"}`}>{eyebrow}</span>
      <h2 className={`mt-2 text-3xl md:text-4xl font-bold ${light ? "text-white" : "text-[#0D1B2A]"} leading-tight`}>{title}</h2>
      {subtitle && <p className={`mt-3 text-base ${light ? "text-slate-300" : "text-slate-500"} max-w-2xl ${center ? "mx-auto" : ""}`}>{subtitle}</p>}
    </div>
  );
}

function CarCard({ vehicle, onClick }: { vehicle: Vehicle; onClick: () => void }) {
  const [wishlisted, setWishlisted] = useState(false);
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.13)] transition-all duration-300 group cursor-pointer flex flex-col" onClick={onClick}>
      <div className="relative overflow-hidden bg-slate-100" style={{ height: 210 }}>
        <img src={vehicle.img} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        {vehicle.badge && (
          <span className="absolute top-3 left-3 bg-[#1E56A0] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">{vehicle.badge}</span>
        )}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow"
          onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
        </button>
        <div className="absolute bottom-3 left-3">
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm ${vehicle.condition === "New" ? "bg-emerald-500 text-white" : "bg-amber-400 text-black"}`}>{vehicle.condition}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{vehicle.make}</p>
            <h3 className="text-base font-bold text-[#0D1B2A] leading-tight">{vehicle.model} <span className="font-medium text-slate-500">{vehicle.variant}</span></h3>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{vehicle.year}</span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 mb-4">
          <span className="flex items-center gap-1 text-[11px] text-slate-500"><Gauge className="w-3.5 h-3.5 text-slate-400" />{vehicle.mileage === 0 ? "0 km" : `${vehicle.mileage.toLocaleString()} km`}</span>
          <span className="flex items-center gap-1 text-[11px] text-slate-500"><Settings2 className="w-3.5 h-3.5 text-slate-400" />{vehicle.transmission}</span>
          <span className="flex items-center gap-1 text-[11px] text-slate-500"><Fuel className="w-3.5 h-3.5 text-slate-400" />{vehicle.fuel}</span>
          <span className="flex items-center gap-1 text-[11px] text-slate-500"><MapPin className="w-3.5 h-3.5 text-slate-400" />{vehicle.city}</span>
        </div>
        <div className="mt-auto border-t border-slate-100 pt-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-medium">ASKING PRICE</p>
            <p className="text-lg font-bold text-[#1E56A0]">{formatPKR(vehicle.price)}</p>
          </div>
          <button className="flex items-center gap-1.5 bg-[#0F2B4C] hover:bg-[#1E56A0] text-white text-xs font-semibold px-3 py-2 rounded transition-colors duration-200">
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks: { label: string; page: Page }[] = [
    { label: "Inventory", page: "inventory" },
    { label: "Rental", page: "rental" },
    { label: "Sell Your Car", page: "sell" },
    { label: "About Us", page: "about" },
    
  ];

  const go = (p: Page) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)]" : "bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button onClick={() => go("home")} className="flex items-center gap-3 flex-shrink-0">
            <img src={xyzLogo} alt="XYZ Motors Logo" className="h-9 w-auto object-contain" style={{ filter: "brightness(0.3) contrast(1.2)" }} />
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-[#0F2B4C] tracking-tight leading-none block">XYZ Motors</span>
              
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => go(link.page)}
                className={`px-3.5 py-2 text-sm font-medium rounded transition-colors duration-150 ${page === link.page ? "text-[#1E56A0] bg-blue-50" : "text-slate-600 hover:text-[#0F2B4C] hover:bg-slate-50"}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <a href="tel:+923001234567" className="hidden md:flex items-center gap-2 text-sm text-slate-600 font-medium hover:text-[#1E56A0] transition-colors">
              <PhoneCall className="w-4 h-4" />
              <span>0300-1234567</span>
            </a>
            <button onClick={() => go("contact")} className="hidden sm:block bg-[#1E56A0] hover:bg-[#0F2B4C] text-white text-sm font-semibold px-4 py-2 rounded transition-colors duration-200">
              Contact Us
            </button>
            <button className="lg:hidden p-2 text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <button key={link.page} onClick={() => go(link.page)} className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-[#1E56A0] hover:bg-blue-50 rounded transition-colors">
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <button onClick={() => go("contact")} className="w-full bg-[#1E56A0] text-white text-sm font-semibold py-2.5 rounded">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <footer className="bg-[#060E1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-400">© 2026 XYZ Motors. All rights reserved.</p>
        <p className="text-sm font-medium text-slate-400">
          Designed and Developed by <a href="https://www.instagram.com/norvexmanagement/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Norvex Management</a>
        </p>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage, setSelectedCar }: { setPage: (p: Page) => void; setSelectedCar: (v: Vehicle) => void }) {
  const [activeTab, setActiveTab] = useState("featured");
  const [searchMake, setSearchMake] = useState("");
  const [searchBody, setSearchBody] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const tabs = [
    { id: "featured", label: "Featured Cars" },
    { id: "latest", label: "Latest Arrivals" },
    { id: "luxury", label: "Luxury Vehicles" },
    { id: "suv", label: "SUV Collection" },
    { id: "budget", label: "Budget Cars" },
  ];

  const filteredVehicles = VEHICLES.filter(v => {
    if (activeTab === "featured") return v.featured;
    if (activeTab === "latest") return v.condition === "New";
    if (activeTab === "luxury") return v.price >= 10000000;
    if (activeTab === "suv") return v.bodyType === "SUV" || v.bodyType === "Crossover" || v.bodyType === "Pickup";
    if (activeTab === "budget") return v.price <= 3000000;
    return true;
  }).slice(0, 8);

  const handleSearch = () => {
    setPage("inventory");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToDetails = (v: Vehicle) => { setSelectedCar(v); setPage("details"); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #060E1A 0%, #0F2B4C 50%, #1a3a6b 100%)" }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1692406069831-0bb7ea297645?w=1920&h=1080&fit=crop&auto=format" alt="XYZ Motors Showroom" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(6,14,26,0.95) 0%, rgba(15,43,76,0.8) 50%, rgba(6,14,26,0.4) 100%)" }} />
        </div>
        {/* Decorative line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-[#1E56A0] rounded-r" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-full">
            <div className="flex items-center gap-2 mb-6">
              
              
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
              Drive Your <span>Dream</span> <span className="text-[#4A9EE8]">Car</span> Today.
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Premium new and pre owned vehicles with transparent pricing and doorstep delivery.
            </p>

            {/* Search bar */}
            <div className="mt-10 bg-white rounded-lg shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
                <Car className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <select value={searchMake} onChange={e => setSearchMake(e.target.value)} className="flex-1 text-sm text-slate-700 bg-transparent outline-none font-medium">
                  <option value="">All Brands</option>
                  {["Toyota", "Honda", "Suzuki", "KIA", "Hyundai", "MG", "Changan", "Haval"].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
                <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <select value={searchBody} onChange={e => setSearchBody(e.target.value)} className="flex-1 text-sm text-slate-700 bg-transparent outline-none font-medium">
                  <option value="">Body Type</option>
                  {["Sedan", "SUV", "Hatchback", "Crossover", "Pickup"].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <select value={searchCity} onChange={e => setSearchCity(e.target.value)} className="flex-1 text-sm text-slate-700 bg-transparent outline-none font-medium">
                  <option value="">All Cities</option>
                  {["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <button onClick={handleSearch} className="flex items-center justify-center gap-2 bg-[#1E56A0] hover:bg-[#0F2B4C] text-white font-bold text-sm px-6 py-3 rounded transition-colors duration-200 flex-shrink-0">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

            {/* Quick stats */}
            <div className="mt-8 flex flex-wrap gap-6">
              {[["1,800+", "Cars Listed"], ["48hr", "Loan Approval"], ["100%", "Verified Sellers"]].map(([val, label]) => (
                <div key={label} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-sm text-white"><strong>{val}</strong> <span className="text-slate-400">{label}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>


      </section>

      {/* FEATURED CATEGORIES */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto snap-x hide-scrollbar gap-3 pb-2">
            {[
              { icon: Car, label: "Sedans", count: 7 },
              { icon: Package, label: "SUVs", count: 8 },
              { icon: Gauge, label: "Hatchbacks", count: 4 },
              { icon: Navigation, label: "Crossovers", count: 3 },
              { icon: Wrench, label: "Pickups", count: 2 },
              { icon: Wallet, label: "Budget Cars", count: 5 },
            ].map(({ icon: Icon, label, count }) => (
              <button key={label} onClick={() => setPage("inventory")} className="relative flex flex-col items-center justify-center gap-2 w-28 h-28 rounded-sm bg-gradient-to-br from-[#1E56A0] to-[#0F2B4C] hover:from-[#2563EB] hover:to-[#1E56A0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex-shrink-0 snap-center group overflow-hidden border border-[#0F2B4C]">
                <Icon className="w-8 h-8 text-blue-100 group-hover:text-white transition-colors z-10" />
                <span className="text-[11px] font-bold text-blue-50 group-hover:text-white uppercase tracking-wider z-10">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* VEHICLES SECTION WITH TABS */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <SectionHeader eyebrow="Vehicle Inventory" title="Find Your Perfect Match" subtitle="Explore our curated selection of certified vehicles across all categories." />
            <button onClick={() => setPage("inventory")} className="flex items-center gap-2 text-[#1E56A0] font-semibold text-sm hover:gap-3 transition-all duration-200 flex-shrink-0 mb-12 md:mb-0">
              View All Vehicles <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-2 flex-wrap mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-semibold rounded transition-all duration-200 ${activeTab === tab.id ? "bg-[#0F2B4C] text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Vehicle grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredVehicles.map(v => <CarCard key={v.id} vehicle={v} onClick={() => goToDetails(v)} />)}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Car className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No vehicles in this category right now.</p>
            </div>
          )}
        </div>
      </section>

      {/* RENTAL VEHICLES STRIP */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #0F2B4C 0%, #1E56A0 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-300">Car Rental Service</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">Rent a Vehicle for Any Occasion</h2>
              <p className="mt-3 text-blue-200 max-w-lg">From daily commutes to month long business trips — clean, insured, and delivered to your door.</p>
              <div className="mt-6 flex flex-wrap gap-4">
                {["Daily from Rs. 6,500", "Driver Available", "All Major Cities", "Full Insurance"].map(f => (
                  <span key={f} className="flex items-center gap-2 text-sm text-white"><CheckCircle className="w-4 h-4 text-blue-300" />{f}</span>
                ))}
              </div>
              <button onClick={() => setPage("rental")} className="mt-8 bg-white text-[#0F2B4C] font-bold text-sm px-6 py-3 rounded hover:bg-blue-50 transition-colors flex items-center gap-2">
                Explore Rental Plans <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-shrink-0 hidden lg:block">
              <img src="https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=500&h=280&fit=crop" alt="Rental Car" className="rounded-lg shadow-2xl object-cover w-[420px] h-[250px]" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">Why XYZ Motors</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#0D1B2A]">Pakistan's Most Trusted Dealership</h2>
            <p className="mt-3 text-slate-500 max-w-2xl mx-auto">Built on trust transparency and 18 years of customer satisfaction.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Verified Vehicles", desc: "Every car undergoes a rigorous 150 point inspection before listing. No hidden damage no surprises." },
              { icon: Banknote, title: "Fast Process", desc: "Complete your car purchase in less than 24 hours with our streamlined and efficient process." },

              { icon: Headphones, title: "24/7 After Sale Support", desc: "Our dedicated support team is available around the clock for any post purchase assistance." },
              { icon: BadgeCheck, title: "Transparent Pricing", desc: "Fixed no negotiation pricing with complete cost breakdown. No hidden fees or surprise charges." },
              { icon: Globe, title: "Nationwide Delivery", desc: "We deliver your purchased or rented vehicle to any major city across Pakistan within 48 hours." },
              { icon: Wrench, title: "Free Inspection", desc: "Complimentary pre purchase vehicle health check for all certified pre owned vehicles at our workshops." },
              { icon: FileText, title: "Clear Documentation", desc: "We handle all transfer paperwork tax clearance and registration formalities on your behalf." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="relative bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="relative w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-[#1E56A0] transition-colors duration-300 shadow-sm">
                  <Icon className="w-6 h-6 text-[#1E56A0] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="relative text-base font-extrabold text-[#0D1B2A] mb-3 tracking-tight">{title}</h3>
                <p className="relative text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">Customer Reviews</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#0D1B2A]">Loved by Thousands Across Pakistan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.slice(0, 4).map(t => (
              <div key={t.id} className="bg-white rounded-lg p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-[#0F2B4C] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0D1B2A]">{t.name}</p>
                    <p className="text-[11px] text-slate-400">{t.city} · {t.car}</p>
                  </div>
                  <div className="ml-auto">
                    <ThumbsUp className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO BUY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <SectionHeader eyebrow="Buying Process" title="Simple Steps to Your New Car" subtitle="Drive home your dream car in just 24 hours." center={true} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative mt-12">
            {[
              { step: "01", icon: Search, title: "Select", desc: "Browse our inventory and select your dream car." },
              { step: "02", icon: Eye, title: "Inspect", desc: "Visit our dealership for a full physical inspection." },
              { step: "03", icon: Banknote, title: "Purchase", desc: "Complete the easy paperwork and payment process." },
              { step: "04", icon: Car, title: "Drive", desc: "Take the keys and drive your new car home." },
            ].map(({ step, icon: Icon, title, desc }, idx) => (
              <div key={step} className="relative bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-[#1E56A0] hover:shadow-lg transition-all duration-300 group overflow-hidden">
                <div className="absolute -right-4 -top-8 text-9xl font-black text-slate-200/50 group-hover:text-blue-100/50 transition-colors pointer-events-none select-none">
                  {idx + 1}
                </div>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 border border-slate-100 relative z-10 group-hover:bg-[#1E56A0] transition-colors">
                  <Icon className="w-5 h-5 text-[#1E56A0] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#0D1B2A] mb-2 relative z-10">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed relative z-10">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-16" style={{ background: "#0F2B4C" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{s.value}</div>
                <div className="text-sm text-blue-300 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-24 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1618418721668-0d1f72aa4bab?w=1920&h=600&fit=crop&auto=format" alt="Premium car" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(6,14,26,0.95) 0%, rgba(6,14,26,0.7) 60%, rgba(6,14,26,0.3) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">Sell or Exchange</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-white leading-tight">Ready to Sell Your Car?</h2>
            <p className="mt-4 text-slate-300 text-base leading-relaxed">Get a free, no-obligation valuation of your vehicle in under 30 minutes. We offer the best market rates and handle all paperwork.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => { setPage("sell"); window.scrollTo({ top: 0 }); }} className="bg-[#1E56A0] hover:bg-blue-500 text-white font-bold text-sm px-6 py-3.5 rounded transition-colors flex items-center gap-2">
                Get Free Valuation <ArrowRight className="w-4 h-4" />
              </button>
              <a href="https://wa.me/923001234567" className="flex items-center gap-2 bg-[#25D366] hover:bg-green-400 text-white font-bold text-sm px-6 py-3.5 rounded transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── INVENTORY PAGE ────────────────────────────────────────────────────────────
function InventoryPage({ setPage, setSelectedCar }: { setPage: (p: Page) => void; setSelectedCar: (v: Vehicle) => void }) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({ make: "", minPrice: "", maxPrice: "", year: "", transmission: "", fuel: "", bodyType: "", city: "", condition: "" });
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Prevent body scroll when filters are open
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [showFilters]);

  const filtered = VEHICLES.filter(v => {
    if (filters.make && v.make !== filters.make) return false;
    if (filters.minPrice && v.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && v.price > parseInt(filters.maxPrice)) return false;
    if (filters.year && v.year !== parseInt(filters.year)) return false;
    if (filters.transmission && v.transmission !== filters.transmission) return false;
    if (filters.fuel && v.fuel !== filters.fuel) return false;
    if (filters.bodyType && v.bodyType !== filters.bodyType) return false;
    if (filters.city && v.city !== filters.city) return false;
    if (filters.condition && v.condition !== filters.condition) return false;
    return true;
  }).sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return b.year - a.year;
  });

  const goToDetails = (v: Vehicle) => { setSelectedCar(v); setPage("details"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const setFilter = (key: string, val: string) => setFilters(p => ({ ...p, [key]: val }));
  const clearFilters = () => {
    setFilters({ make: "", minPrice: "", maxPrice: "", year: "", transmission: "", fuel: "", bodyType: "", city: "", condition: "" });
  };

  const selectClass = "w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] transition-colors";

  return (
    <div className="pt-16 min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0F2B4C 0%, #1E56A0 100%)" }} className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <button onClick={() => setPage("home")} className="hover:text-white transition-colors">Home</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">Vehicle Inventory</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Browse Our Inventory</h1>
          <p className="text-blue-200 mt-2">Find your perfect vehicle from our verified, certified collection.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Bar: Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowFilters(true)} className="flex items-center gap-2 bg-[#1E56A0] hover:bg-[#0F2B4C] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors">
              <Filter className="w-4 h-4" /> Filters
              {Object.values(filters).filter(Boolean).length > 0 && (
                <span className="bg-white text-[#1E56A0] w-5 h-5 rounded-full flex items-center justify-center text-[10px] ml-1">
                  {Object.values(filters).filter(Boolean).length}
                </span>
              )}
            </button>
            <p className="text-sm text-slate-500 font-medium"><span className="text-[#0D1B2A] font-bold text-base">{filtered.length}</span> vehicles found</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select value={sort} onChange={e => setSort(e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50 text-slate-700 outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0]">
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-slate-50 p-1">
              <button onClick={() => setView("grid")} className={`p-1.5 rounded transition-colors ${view === "grid" ? "bg-white shadow text-[#0F2B4C]" : "text-slate-400 hover:text-slate-600"}`}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setView("list")} className={`p-1.5 rounded transition-colors ${view === "list" ? "bg-white shadow text-[#0F2B4C]" : "text-slate-400 hover:text-slate-600"}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid/List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-[#0D1B2A] mb-2">No vehicles found</h3>
            <p className="text-sm text-slate-500 mb-6">We couldn't find any cars matching your current filters.</p>
            <button onClick={clearFilters} className="bg-[#1E56A0] hover:bg-[#0F2B4C] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors">Clear All Filters</button>
          </div>
        ) : (
          view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map(v => <CarCard key={v.id} vehicle={v} onClick={() => goToDetails(v)} />)}
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
              {filtered.map(v => (
                <div key={v.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row overflow-hidden cursor-pointer group" onClick={() => goToDetails(v)}>
                  <div className="sm:w-64 h-48 sm:h-auto flex-shrink-0 relative overflow-hidden">
                    <img src={v.img} alt={`${v.make} ${v.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {v.badge && <span className="absolute top-3 left-3 bg-[#1E56A0] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">{v.badge}</span>}
                  </div>
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{v.make} • {v.bodyType}</p>
                        <h3 className="text-xl font-bold text-[#0D1B2A]">{v.model} <span className="font-medium text-slate-500">{v.variant}</span></h3>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Asking Price</p>
                        <p className="text-2xl font-black text-[#1E56A0]">{formatPKR(v.price)}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 mb-6">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600"><Calendar className="w-4 h-4 text-slate-400" />{v.year}</span>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600"><Gauge className="w-4 h-4 text-slate-400" />{v.mileage === 0 ? "0 km" : `${v.mileage.toLocaleString()} km`}</span>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600"><Settings2 className="w-4 h-4 text-slate-400" />{v.transmission}</span>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600"><Fuel className="w-4 h-4 text-slate-400" />{v.fuel}</span>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600"><MapPin className="w-4 h-4 text-slate-400" />{v.city}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${v.condition === "New" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{v.condition}</span>
                    </div>

                    <div className="mt-auto flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                      <button className="bg-[#0F2B4C] hover:bg-[#1E56A0] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2">View Details <ArrowRight className="w-3.5 h-3.5" /></button>
                      <button className="border border-slate-200 hover:border-[#25D366] text-slate-600 hover:text-[#25D366] hover:bg-green-50 text-xs font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2" onClick={e => { e.stopPropagation(); window.open("https://wa.me/923001234567"); }}><MessageCircle className="w-4 h-4" />WhatsApp</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Filter Modal Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowFilters(false)} />
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-white">
              <h3 className="font-bold text-lg text-[#0D1B2A] flex items-center gap-2"><Filter className="w-5 h-5 text-[#1E56A0]" /> Filter Inventory</h3>
              <button onClick={() => setShowFilters(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {[
                { label: "Brand", key: "make", options: ["Toyota", "Honda", "Suzuki", "KIA", "Hyundai", "MG", "Changan", "Haval"] },
                { label: "Transmission", key: "transmission", options: ["Automatic", "Manual"] },
                { label: "Fuel Type", key: "fuel", options: ["Petrol", "Diesel", "Hybrid", "Electric"] },
                { label: "Body Type", key: "bodyType", options: ["Sedan", "SUV", "Hatchback", "Crossover", "Pickup"] },
                { label: "City", key: "city", options: ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar"] },
                { label: "Condition", key: "condition", options: ["New", "Used"] },
                { label: "Year", key: "year", options: ["2024", "2023", "2022", "2021", "2020"] },
              ].map(({ label, key, options }) => (
                <div key={key}>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">{label}</label>
                  <select value={(filters as any)[key]} onChange={e => setFilter(key, e.target.value)} className={selectClass}>
                    <option value="">All {label}s</option>
                    {options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Price Range (PKR)</label>
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="Min Price" value={filters.minPrice} onChange={e => setFilter("minPrice", e.target.value)} className={selectClass} />
                  <input type="number" placeholder="Max Price" value={filters.maxPrice} onChange={e => setFilter("maxPrice", e.target.value)} className={selectClass} />
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-white grid grid-cols-2 gap-3">
              <button onClick={clearFilters} className="px-4 py-3 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Clear All</button>
              <button onClick={() => setShowFilters(false)} className="px-4 py-3 rounded-lg font-bold text-white bg-[#1E56A0] hover:bg-[#0F2B4C] transition-colors shadow-lg shadow-blue-900/20">Apply Filters</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CAR DETAILS PAGE ─────────────────────────────────────────────────────────
function CarDetailsPage({ car, setPage }: { car: Vehicle; setPage: (p: Page) => void }) {
  const [activeImg, setActiveImg] = useState(0);
  const [downPct, setDownPct] = useState(20);
  const [tenure, setTenure] = useState(36);
  const [rate, setRate] = useState(23);

  const images = [car.img, car.img + "&q=80", car.img + "&q=70", car.img + "&q=60"];
  const downAmount = (car.price * downPct) / 100;
  const principal = car.price - downAmount;
  const emi = calcEMI(principal, rate, tenure);

  return (
    <div className="pt-16 min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => setPage("home")} className="hover:text-[#1E56A0]">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => setPage("inventory")} className="hover:text-[#1E56A0]">Inventory</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0D1B2A] font-semibold">{car.make} {car.model}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Gallery + Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="bg-white rounded-lg overflow-hidden border border-slate-100 shadow-sm">
              <div className="relative overflow-hidden" style={{ height: 380 }}>
                <img src={images[activeImg]} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
                {car.badge && <span className="absolute top-4 left-4 bg-[#1E56A0] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">{car.badge}</span>}
                <span className={`absolute top-4 right-4 text-xs font-bold uppercase px-3 py-1 rounded ${car.condition === "New" ? "bg-emerald-500 text-white" : "bg-amber-400 text-black"}`}>{car.condition}</span>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button className="w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center"><Heart className="w-4 h-4 text-slate-500" /></button>
                  <button className="w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center"><Share2 className="w-4 h-4 text-slate-500" /></button>
                </div>
              </div>
              <div className="flex gap-2 p-3">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`overflow-hidden rounded flex-shrink-0 transition-all ${activeImg === i ? "ring-2 ring-[#1E56A0]" : "opacity-60 hover:opacity-80"}`} style={{ width: 72, height: 50 }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
                <button className="flex-1 h-[50px] rounded border border-dashed border-slate-300 flex items-center justify-center gap-1 text-slate-400 text-xs font-medium">
                  <Camera className="w-3.5 h-3.5" />+8 photos
                </button>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="bg-white rounded-lg border border-slate-100 shadow-sm p-6">
              <h1 className="text-2xl font-bold text-[#0D1B2A]">{car.year} {car.make} {car.model} <span className="font-medium text-slate-400">{car.variant}</span></h1>
              <div className="flex flex-wrap gap-4 mt-4 pb-5 border-b border-slate-100">
                {[["Year", car.year], ["Mileage", car.mileage === 0 ? "Brand New" : `${car.mileage.toLocaleString()} km`], ["Transmission", car.transmission], ["Fuel", car.fuel], ["City", car.city], ["Condition", car.condition]].map(([k, v]) => (
                  <div key={String(k)} className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{k}</span>
                    <span className="text-sm font-semibold text-[#0D1B2A] mt-0.5">{v}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-base font-bold text-[#0D1B2A] mt-5 mb-4">Vehicle Specifications</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[["Engine", "1496 cc"], ["Max Power", "120 hp @ 6000 rpm"], ["Torque", "145 Nm @ 4200 rpm"], ["Drive", "Front Wheel Drive"], ["Seats", "5 Passengers"], ["Doors", "4 Doors"], ["Color", car.color || "White"], ["Body Type", car.bodyType], ["Registration", "Unregistered"]].map(([k, v]) => (
                  <div key={String(k)} className="bg-slate-50 rounded p-3 border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{k}</p>
                    <p className="text-sm font-semibold text-[#0D1B2A] mt-1">{v}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-base font-bold text-[#0D1B2A] mt-6 mb-3">Key Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {["Push Start Button", "Keyless Entry", "Cruise Control", "Reverse Camera", "Apple CarPlay / Android Auto", "Dual Airbags", "ABS Brakes", "Alloy Wheels", "LED Headlights", "Climate Control A/C", "Leather Seats", "Sunroof"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />{f}</div>
                ))}
              </div>

              <h3 className="text-base font-bold text-[#0D1B2A] mt-6 mb-3">Description</h3>
              <p className="text-sm text-slate-500 leading-relaxed">This {car.year} {car.make} {car.model} {car.variant} is in pristine condition. The vehicle has been thoroughly inspected by our certified technicians and comes with XYZ Motors' quality guarantee. All documents are clear with no outstanding loans or legal issues. The vehicle is available for immediate delivery across Pakistan. Genuine mileage, no accident history.</p>
            </div>

            {/* Loan Calculator */}
            <div className="bg-white rounded-lg border border-slate-100 shadow-sm p-6">
              <h3 className="text-base font-bold text-[#0D1B2A] mb-5 flex items-center gap-2"><Calculator className="w-5 h-5 text-[#1E56A0]" />Financing Calculator</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block mb-2">Down Payment ({downPct}%)</label>
                  <input type="range" min={15} max={50} value={downPct} onChange={e => setDownPct(parseInt(e.target.value))} className="w-full accent-[#1E56A0]" />
                  <p className="text-sm font-bold text-[#1E56A0] mt-1">{formatPKR(downAmount)}</p>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block mb-2">Tenure: {tenure} months</label>
                  <input type="range" min={12} max={60} step={12} value={tenure} onChange={e => setTenure(parseInt(e.target.value))} className="w-full accent-[#1E56A0]" />
                  <p className="text-sm font-bold text-[#1E56A0] mt-1">{tenure / 12} Year{tenure > 12 ? "s" : ""}</p>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block mb-2">Annual Rate: {rate}%</label>
                  <input type="range" min={20} max={28} value={rate} onChange={e => setRate(parseInt(e.target.value))} className="w-full accent-[#1E56A0]" />
                  <p className="text-sm font-bold text-[#1E56A0] mt-1">{rate}% p.a.</p>
                </div>
              </div>
              <div className="bg-[#F1F5F9] rounded-lg p-5 flex flex-wrap gap-6">
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Vehicle Price</p>
                  <p className="text-lg font-bold text-[#0D1B2A]">{formatPKR(car.price)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Down Payment</p>
                  <p className="text-lg font-bold text-[#0D1B2A]">{formatPKR(downAmount)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Loan Amount</p>
                  <p className="text-lg font-bold text-[#0D1B2A]">{formatPKR(principal)}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Monthly Installment</p>
                  <p className="text-2xl font-extrabold text-[#1E56A0]">{formatPKR(Math.round(emi))}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3">* Estimated calculation. Actual rates may vary by bank. Subject to bank approval and credit assessment.</p>
            </div>
          </div>

          {/* Right: Pricing + Actions */}
          <div className="space-y-5 sticky top-20">
            <div className="bg-white rounded-lg border border-slate-100 shadow-sm p-5">
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Asking Price</p>
              <p className="text-3xl font-extrabold text-[#1E56A0] mt-1">{formatPKR(car.price)}</p>
              <p className="text-xs text-slate-400 mt-1">All inclusive — no hidden charges</p>

              <div className="mt-5 space-y-3">
                <button className="w-full bg-[#0F2B4C] hover:bg-[#1E56A0] text-white font-bold text-sm py-3 rounded transition-colors flex items-center justify-center gap-2">
                  <Car className="w-4 h-4" /> Book a Test Drive
                </button>
                <a href="https://wa.me/923001234567" className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-green-400 text-white font-bold text-sm py-3 rounded transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Inquiry
                </a>
                <a href="tel:+923001234567" className="flex items-center justify-center gap-2 w-full border border-slate-200 text-slate-700 hover:border-slate-300 font-semibold text-sm py-3 rounded transition-colors">
                  <Phone className="w-4 h-4" /> 0300-1234567
                </a>
              </div>

              <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">XYZ Motors Guarantees</p>
                {["Verified documents & clear title", "150 point inspection report", "No hidden charges or fees", "Post-sale 30-day support"].map(g => (
                  <div key={g} className="flex items-start gap-2 text-xs text-slate-600"><CircleCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{g}</div>
                ))}
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg border border-slate-100 shadow-sm p-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">Seller Information</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-[#0F2B4C] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">XYZ</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0D1B2A]">XYZ Motors</p>
                  <div className="flex items-center gap-1"><BadgeCheck className="w-3.5 h-3.5 text-[#1E56A0]" /><span className="text-[11px] text-[#1E56A0] font-semibold">Verified Dealer</span></div>
                </div>
              </div>
              <div className="text-xs text-slate-500 space-y-1.5">
                <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />Main Boulevard, Gulberg III, Lahore</span>
                <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />Mon–Sat: 9:00 AM – 7:00 PM</span>
                <span className="flex items-center gap-2"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />4.9 / 5 (2,400+ reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CAR RENTAL PAGE ──────────────────────────────────────────────────────────
function RentalPage({ setPage }: { setPage: (p: Page) => void }) {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [pickupCity, setPickupCity] = useState("Lahore");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [withDriver, setWithDriver] = useState(false);

  const luxuryRentals = [
    { name: "Toyota Fortuner", rate: 15000, img: "https://images.unsplash.com/photo-1771904488909-9137431615c5?w=400&h=250&fit=crop" },
    { name: "Toyota Prado", rate: 25000, img: "https://images.unsplash.com/photo-1618353482480-61ca5a9a7879?w=400&h=250&fit=crop" },
    { name: "Honda Civic", rate: 9000, img: "https://images.unsplash.com/photo-1619431856706-ca2cc58258f6?w=400&h=250&fit=crop" },
    { name: "MG HS", rate: 12000, img: "https://images.unsplash.com/photo-1777175013217-36fa50584299?w=400&h=250&fit=crop" },
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="relative py-20" style={{ background: "linear-gradient(135deg, #060E1A 0%, #0F2B4C 60%, #1a3a6b 100%)" }}>
        <img src="https://images.unsplash.com/photo-1623346483743-b968a27ed34c?w=1920&h=600&fit=crop" alt="Car rental hero" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-300">XYZ Motors Rental</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">Premium Car Rental Across Pakistan</h1>
          <p className="mt-4 text-blue-200 max-w-2xl mx-auto">Flexible daily, weekly, and monthly rental plans with clean, insured vehicles and optional professional drivers.</p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="bg-white border-b border-slate-100 py-8 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Pickup City</label>
              <select value={pickupCity} onChange={e => setPickupCity(e.target.value)} className="border border-slate-200 rounded px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1E56A0] bg-slate-50">
                {["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Pickup Date</label>
              <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} className="border border-slate-200 rounded px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1E56A0] bg-slate-50" />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Return Date</label>
              <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} className="border border-slate-200 rounded px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1E56A0] bg-slate-50" />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">With Driver</label>
              <select value={withDriver ? "yes" : "no"} onChange={e => setWithDriver(e.target.value === "yes")} className="border border-slate-200 rounded px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1E56A0] bg-slate-50">
                <option value="no">Self Drive</option>
                <option value="yes">With Driver</option>
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <button className="bg-[#1E56A0] hover:bg-[#0F2B4C] text-white font-bold text-sm py-2.5 px-5 rounded transition-colors flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />Check Availability
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Plans */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionHeader eyebrow="Rental Plans" title="Choose the Right Plan for You" subtitle="Transparent pricing with no hidden fees. All vehicles are fully insured and maintained." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RENTAL_PLANS.map(plan => (
              <div key={plan.id} className={`bg-white rounded-lg border-2 overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md ${plan.popular ? "border-[#1E56A0] shadow-[0_4px_24px_rgba(30,86,160,0.15)]" : "border-slate-100"}`}>
                {plan.popular && <div className="bg-[#1E56A0] text-white text-center text-xs font-bold py-1.5 uppercase tracking-wider">Most Popular</div>}
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{plan.type} Rental</p>
                  <div className="mt-3 flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-[#0D1B2A]">Rs. {plan.price.toLocaleString()}</span>
                    <span className="text-sm text-slate-400 mb-1">/ {plan.duration.toLowerCase()}</span>
                  </div>
                  <div className="mt-5 mb-5 space-y-2">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />{f}</div>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 pt-4 mb-5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Available Vehicles</p>
                    {plan.vehicles.map(v => <p key={v} className="text-xs text-slate-500 flex items-center gap-1"><Car className="w-3 h-3 text-[#1E56A0]" />{v}</p>)}
                  </div>
                  <button className={`w-full font-bold text-sm py-3 rounded transition-colors ${plan.popular ? "bg-[#1E56A0] text-white hover:bg-[#0F2B4C]" : "border border-[#1E56A0] text-[#1E56A0] hover:bg-blue-50"}`}>
                    Book This Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Rentals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Premium Selection" title="Luxury Vehicle Rentals" subtitle="Elevate your travel with our premium fleet — perfect for corporate events, weddings, and VIP occasions." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {luxuryRentals.map(car => (
              <div key={car.name} className="bg-white rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="overflow-hidden" style={{ height: 160 }}>
                  <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-bold text-[#0D1B2A]">{car.name}</p>
                  <p className="text-[#1E56A0] font-bold text-base mt-1">Rs. {car.rate.toLocaleString()}<span className="text-xs text-slate-400 font-normal">/day</span></p>
                  <button className="mt-3 w-full text-xs font-semibold border border-[#1E56A0] text-[#1E56A0] py-1.5 rounded hover:bg-[#1E56A0] hover:text-white transition-colors">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-[#0D1B2A] mb-6">Rental Terms & Conditions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Valid CNIC and driving license required", "Security deposit of Rs. 20,000–50,000", "Fuel is the responsibility of the renter", "Overtime charges apply after agreed return time", "Traffic fines are the renter's responsibility", "Comprehensive insurance included in all plans", "24/7 roadside assistance provided", "Cancellations accepted 24 hours in advance"].map(t => (
              <div key={t} className="flex items-start gap-2 text-sm text-slate-600"><CircleCheck className="w-4 h-4 text-[#1E56A0] flex-shrink-0 mt-0.5" />{t}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── SELL YOUR CAR PAGE ────────────────────────────────────────────────────────
function SellCarPage({ setPage }: { setPage: (p: Page) => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ make: "", model: "", year: "", mileage: "", transmission: "", fuel: "", condition: "", city: "", name: "", phone: "", email: "", inspectionDate: "" });
  const setField = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const inputClass = "w-full border border-slate-200 rounded px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0]/20 bg-white transition-all";

  return (
    <div className="pt-16 min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="relative py-20" style={{ background: "#0F2B4C" }}>
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1618418721668-0d1f72aa4bab?w=1920&h=400&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-300">Sell or Exchange</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">Get the Best Price for Your Car</h1>
          <p className="mt-4 text-blue-200 max-w-xl mx-auto">Free inspection, instant valuation, and same-day payment. We handle all the paperwork.</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Steps indicator */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-5 left-0 right-0 h-px bg-slate-200 z-0" />
          {[{ n: 1, label: "Vehicle Info" }, { n: 2, label: "Owner Details" }, { n: 3, label: "Book Inspection" }].map(s => (
            <div key={s.n} className="flex flex-col items-center gap-2 relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${step > s.n ? "bg-[#1E56A0] border-[#1E56A0] text-white" : step === s.n ? "bg-white border-[#1E56A0] text-[#1E56A0]" : "bg-white border-slate-200 text-slate-400"}`}>
                {step > s.n ? <Check className="w-4 h-4" /> : s.n}
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${step === s.n ? "text-[#1E56A0]" : step > s.n ? "text-slate-600" : "text-slate-400"}`}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg border border-slate-100 shadow-sm p-8">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">Vehicle Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Brand *</label>
                  <select value={form.make} onChange={e => setField("make", e.target.value)} className={inputClass}>
                    <option value="">Select Brand</option>
                    {["Toyota", "Honda", "Suzuki", "KIA", "Hyundai", "MG", "Changan", "Haval", "Daihatsu", "Other"].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Model *</label>
                  <input value={form.model} onChange={e => setField("model", e.target.value)} placeholder="e.g. Corolla" className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Model Year *</label>
                  <select value={form.year} onChange={e => setField("year", e.target.value)} className={inputClass}>
                    <option value="">Select Year</option>
                    {Array.from({ length: 15 }, (_, i) => 2024 - i).map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Mileage (km) *</label>
                  <input value={form.mileage} onChange={e => setField("mileage", e.target.value)} placeholder="e.g. 45000" className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Transmission</label>
                  <select value={form.transmission} onChange={e => setField("transmission", e.target.value)} className={inputClass}>
                    <option value="">Select</option>
                    <option>Automatic</option><option>Manual</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Fuel Type</label>
                  <select value={form.fuel} onChange={e => setField("fuel", e.target.value)} className={inputClass}>
                    <option value="">Select</option>
                    <option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>CNG</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Condition</label>
                  <select value={form.condition} onChange={e => setField("condition", e.target.value)} className={inputClass}>
                    <option value="">Select</option>
                    <option>Excellent</option><option>Good</option><option>Fair</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">City</label>
                  <select value={form.city} onChange={e => setField("city", e.target.value)} className={inputClass}>
                    <option value="">Select City</option>
                    {["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Photo upload */}
              <div className="mt-6">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">Vehicle Photos</label>
                <div className="grid grid-cols-4 gap-3">
                  {["Front View", "Rear View", "Side View", "Interior"].map(label => (
                    <div key={label} className="border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-[#1E56A0] hover:bg-blue-50/30 transition-colors text-center">
                      <Camera className="w-6 h-6 text-slate-300" />
                      <span className="text-[10px] text-slate-400 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">Owner Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Full Name *</label>
                  <input value={form.name} onChange={e => setField("name", e.target.value)} placeholder="Muhammad Ali" className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Phone Number *</label>
                  <input value={form.phone} onChange={e => setField("phone", e.target.value)} placeholder="03XX-XXXXXXX" className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Email Address</label>
                  <input value={form.email} onChange={e => setField("email", e.target.value)} placeholder="name@email.com" className={inputClass} />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">CNIC Number *</label>
                  <input placeholder="XXXXX-XXXXXXX-X" className={inputClass} />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Vehicle Registration Number</label>
                  <input placeholder="e.g. LHR-2024-1234" className={inputClass} />
                </div>
              </div>
              <div className="mt-5 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-[#1E56A0] font-medium"><Shield className="w-3.5 h-3.5 inline mr-1" />Your information is securely handled and never shared with third parties.</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">Book a Free Inspection</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Preferred Date</label>
                  <input type="date" value={form.inspectionDate} onChange={e => setField("inspectionDate", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Preferred Time</label>
                  <select className={inputClass}>
                    {["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Inspection Location</label>
                  <select className={inputClass}>
                    <option>XYZ Motors — Gulberg III, Lahore</option>
                    <option>XYZ Motors — Clifton, Karachi</option>
                    <option>XYZ Motors — F-7, Islamabad</option>
                    <option>Home Inspection (Additional Rs. 1,000)</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Additional Notes</label>
                  <textarea rows={3} placeholder="Any specific information about your vehicle..." className={inputClass + " resize-none"} />
                </div>
              </div>
              <div className="bg-emerald-50 rounded-lg p-5 border border-emerald-100">
                <h4 className="text-sm font-bold text-emerald-800 mb-2">What happens next?</h4>
                <ul className="space-y-1">
                  {["Our team will call within 2 hours to confirm your appointment", "Certified inspector will assess your vehicle for free", "Receive an instant written valuation offer", "Same-day payment if you accept our offer"].map(item => (
                    <li key={item} className="text-xs text-emerald-700 flex items-center gap-2"><Check className="w-3.5 h-3.5 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#1E56A0] transition-colors">
                <ChevronLeft className="w-4 h-4" />Previous Step
              </button>
            ) : <div />}
            {step < 3 ? (
              <button onClick={() => setStep(s => s + 1)} className="bg-[#0F2B4C] hover:bg-[#1E56A0] text-white font-bold text-sm px-8 py-3 rounded transition-colors flex items-center gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3 rounded transition-colors flex items-center gap-2">
                <CircleCheck className="w-4 h-4" />Submit Request
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ────────────────────────────────────────────────────────────────
function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1692406069831-0bb7ea297645?w=1920&h=600&fit=crop" alt="XYZ Motors showroom" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(6,14,26,0.95) 0%, rgba(6,14,26,0.65) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-300">Our Story</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-white max-w-2xl leading-tight">Serving Pakistan's Automotive Needs Since 2007</h1>
          <p className="mt-5 text-blue-200 max-w-xl text-base leading-relaxed">From a single showroom in Lahore's Gulberg to a nationwide network — XYZ Motors has been Pakistan's most trusted automotive partner for 18 years.</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-[#F1F5F9] rounded-lg p-8 border border-slate-100">
              <div className="w-12 h-12 rounded-lg bg-[#1E56A0] flex items-center justify-center mb-5">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#0D1B2A] mb-3">Our Mission</h2>
              <p className="text-slate-500 text-sm leading-relaxed">To make vehicle ownership accessible, transparent, and stress-free for every Pakistani family. We are committed to delivering honest valuations, verified vehicles — all under one roof.</p>
            </div>
            <div className="bg-[#0F2B4C] rounded-lg p-8">
              <div className="w-12 h-12 rounded-lg bg-[#1E56A0] flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
              <p className="text-blue-200 text-sm leading-relaxed">To become South Asia's most customer-centric automotive marketplace — known for integrity, innovation, and unmatched after-sale service. We envision a Pakistan where every individual can own their dream vehicle with confidence.</p>
            </div>
          </div>

          {/* Company Story */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">Our Journey</span>
              <h2 className="mt-2 text-3xl font-bold text-[#0D1B2A] mb-5">From One Showroom to a National Brand</h2>
              <div className="space-y-5">
                {[["2007", "XYZ Motors founded in Gulberg III, Lahore with a fleet of 20 vehicles and a team of 5 passionate professionals."], ["2012", "Expanded to Karachi and Islamabad. Introduced the first digital inventory system in Pakistan's used car market."], ["2016", "Reached 1,000 vehicles sold milestone."], ["2020", "Introduced online auction, car rental services, and vehicle home delivery across 6 major cities."], ["2025", "Serving 12,000+ customers. Pakistan's first ISO 9001:2015 certified automotive dealership."]].map(([year, desc]) => (
                  <div key={year} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0F2B4C] flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white text-center leading-none">{year}</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed pt-3">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1599912027667-755b68b4dd3b?w=800&h=550&fit=crop" alt="XYZ Motors heritage" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionHeader eyebrow="Our Values" title="Customer First Philosophy" subtitle="Everything we do is guided by these core principles." center={true} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{ icon: Shield, label: "Trust", desc: "We operate with complete transparency no hidden fees no misleading claims." }, { icon: Award, label: "Excellence", desc: "Certified processes ensure every interaction exceeds your expectations." }, { icon: ThumbsUp, label: "Integrity", desc: "Honest valuations and fair pricing always. Our reputation is our greatest asset." }, { icon: Headphones, label: "Care", desc: "Our relationship with customers doesn't end at sale it begins there." }].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300 text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:bg-[#1E56A0] transition-colors duration-300">
                  <Icon className="w-8 h-8 text-[#1E56A0] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-black text-[#0D1B2A] mb-3">{label}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionHeader eyebrow="Leadership" title="Meet Our Team" subtitle="The experienced professionals driving XYZ Motors forward." />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map(member => (
              <div key={member.name} className="text-center group">
                <div className="relative overflow-hidden rounded-lg mb-4 shadow-md" style={{ height: 220 }}>
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                  <div className="absolute inset-0 bg-[#0F2B4C]/0 group-hover:bg-[#0F2B4C]/40 transition-all duration-300 flex items-end justify-center pb-4">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href="#" className="w-8 h-8 bg-white rounded flex items-center justify-center"><Linkedin className="w-4 h-4 text-[#0F2B4C]" /></a>
                    </div>
                  </div>
                </div>
                <p className="font-bold text-[#0D1B2A] text-sm">{member.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ background: "#0F2B4C" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map(s => (<div key={s.label}><div className="text-4xl font-extrabold text-white mb-2">{s.value}</div><div className="text-blue-300 text-sm">{s.label}</div></div>))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactPage({ setPage }: { setPage: (p: Page) => void }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const setField = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const inputClass = "w-full border border-slate-200 rounded px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0]/20 bg-white transition-all";

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0F2B4C 0%, #1a3a6b 100%)" }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-300">Get In Touch</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">We're Here to Help</h1>
          <p className="mt-4 text-blue-200 max-w-xl mx-auto">Whether you want to buy, sell, rent, or just have a question — our team is ready to assist you.</p>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info */}
            <div className="space-y-5">
              {[
                { icon: Phone, title: "Phone", lines: ["0300-1234567", "042-35761234", "Mon–Sat: 9AM–7PM"] },
                { icon: MessageCircle, title: "WhatsApp", lines: ["0300-1234567", "Available 9AM–10PM", "Quick response guaranteed"] },
                { icon: Mail, title: "Email", lines: ["info@xyzmotors.pk", "sales@xyzmotors.pk", "Response within 24 hours"] },
                { icon: MapPin, title: "Head Office — Lahore", lines: ["Main Boulevard, Gulberg III", "Lahore, Punjab 54000", "Mon–Sat: 9:00 AM – 7:00 PM"] },
              ].map(({ icon: Icon, title, lines }) => (
                <div key={title} className="bg-[#F8FAFC] rounded-lg p-5 border border-slate-100 flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#1E56A0] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{title}</p>
                    {lines.map(l => <p key={l} className="text-sm text-[#0D1B2A] font-medium leading-relaxed">{l}</p>)}
                  </div>
                </div>
              ))}

              {/* Branch offices */}
              <div className="bg-[#0F2B4C] rounded-lg p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-3">Branch Locations</p>
                {[["Karachi", "Clifton, Block 5"], ["Islamabad", "F-7 Markaz"], ["Rawalpindi", "Saddar Road"], ["Faisalabad", "Susan Road"]].map(([city, addr]) => (
                  <div key={city} className="flex items-center gap-2 mb-2 last:mb-0">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <span className="text-sm text-blue-200"><span className="font-semibold text-white">{city}:</span> {addr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form + Map */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map placeholder */}
              <div className="bg-slate-100 rounded-lg overflow-hidden border border-slate-200" style={{ height: 240 }}>
                <div className="w-full h-full flex items-center justify-center relative">
                  <img src="https://images.unsplash.com/photo-1585390062628-be8608aa7d83?w=900&h=240&fit=crop" alt="map" className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="bg-[#1E56A0] rounded-full p-3 shadow-lg mb-2">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-bold text-[#0D1B2A] bg-white/90 px-3 py-1 rounded shadow">XYZ Motors — Gulberg III, Lahore</p>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="mt-2 text-xs text-[#1E56A0] font-semibold bg-white/90 px-3 py-1 rounded shadow hover:bg-white transition-colors flex items-center gap-1">
                      View on Google Maps <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              {submitted ? (
                <div className="bg-emerald-50 rounded-lg p-8 border border-emerald-100 text-center">
                  <CircleCheck className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-emerald-800 mb-2">Message Sent!</h3>
                  <p className="text-sm text-emerald-600">Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-5 text-sm font-semibold text-emerald-700 hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-100 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-[#0D1B2A] mb-5">Send Us a Message</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Full Name *</label>
                      <input required value={form.name} onChange={e => setField("name", e.target.value)} placeholder="Muhammad Ali" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Phone Number *</label>
                      <input required value={form.phone} onChange={e => setField("phone", e.target.value)} placeholder="03XX-XXXXXXX" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Email Address</label>
                      <input type="email" value={form.email} onChange={e => setField("email", e.target.value)} placeholder="name@email.com" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Subject</label>
                      <select value={form.subject} onChange={e => setField("subject", e.target.value)} className={inputClass}>
                        <option value="">Select Topic</option>
                        <option>Buy a Vehicle</option>
                        <option>Sell/Exchange</option>
                        <option>Car Rental</option>
                        <option>Financing Inquiry</option>
                        <option>General Inquiry</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Message *</label>
                      <textarea required rows={4} value={form.message} onChange={e => setField("message", e.target.value)} placeholder="Tell us how we can help you..." className={inputClass + " resize-none"} />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-5">
                    <button type="submit" className="flex-1 bg-[#1E56A0] hover:bg-[#0F2B4C] text-white font-bold text-sm py-3 rounded transition-colors flex items-center justify-center gap-2">
                      Send Message <ArrowRight className="w-4 h-4" />
                    </button>
                    <a href="https://wa.me/923001234567" className="flex-1 bg-[#25D366] hover:bg-green-400 text-white font-bold text-sm py-3 rounded transition-colors flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" />WhatsApp Directly
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-14 bg-[#F8FAFC] border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-[#0D1B2A] mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-[#1E56A0]" />Business Hours</h3>
          <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
            {[["Monday – Thursday", "9:00 AM – 7:00 PM", true], ["Friday", "2:30 PM – 7:00 PM (after Jumu'ah)", true], ["Saturday", "9:00 AM – 8:00 PM", true], ["Sunday", "11:00 AM – 5:00 PM (Showroom Only)", true], ["Public Holidays", "Closed", false]].map(([day, time, open]) => (
              <div key={String(day)} className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 last:border-0">
                <span className="text-sm font-medium text-[#0D1B2A]">{day}</span>
                <span className={`text-sm font-semibold ${open ? "text-emerald-600" : "text-red-500"}`}>{time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const AdminDashboard = ({ adminAuth, setAdminAuth, setAdminOpen, forceUpdate }: any) => {
    const [view, setView] = useState("list");
    const [editCar, setEditCar] = useState<any>(null);
    const [password, setPassword] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = "unset"; };
    }, []);

    if (!adminAuth) {
      return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Shield className="w-6 h-6 text-[#1E56A0]" />
            </div>
            <h2 className="text-xl font-bold mb-6 text-center text-[#0D1B2A]">Admin Authentication</h2>
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              className="w-full border border-slate-200 rounded-lg p-3 mb-6 text-[#0D1B2A] focus:outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0]" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  if (password === "xyzadmin") setAdminAuth(true);
                  else alert("Incorrect Password");
                }
              }}
            />
            <div className="flex gap-3">
              <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold p-3 rounded-lg transition-colors" onClick={() => setAdminOpen(false)}>Cancel</button>
              <button className="flex-1 bg-[#1E56A0] hover:bg-[#0F2B4C] text-white font-semibold p-3 rounded-lg transition-colors" onClick={() => {
                if (password === "xyzadmin") setAdminAuth(true);
                else alert("Incorrect Password");
              }}>Login</button>
            </div>
          </div>
        </div>
      );
    }

    const filteredVehicles = VEHICLES.filter(v => 
      v.make.toLowerCase().includes(searchQuery.toLowerCase()) || 
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.year.toString().includes(searchQuery)
    );

    const totalCars = VEHICLES.length;
    const soldCars = VEHICLES.filter(v => v.badge === "Sold Out").length;
    const activeCars = totalCars - soldCars;

    return (
      <div className="fixed inset-0 bg-slate-50 z-[100] overflow-y-auto text-[#0D1B2A]">
        {/* Sticky Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1E56A0] rounded flex items-center justify-center">
                <Settings2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-[#0D1B2A] leading-none">XYZ Motors</h1>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Admin Dashboard</p>
              </div>
            </div>
            {view === "list" && (
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search by Make, Model or Year..." 
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#1E56A0]"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => { 
                setEditCar({ id: Date.now(), make:"", model:"", variant:"", year:2024, price:0, mileage:0, transmission:"Automatic", fuel:"Petrol", city:"Lahore", condition:"New", bodyType:"Sedan", img:"", featured: false, badge: "" }); 
                setView("edit"); 
              }} className="bg-[#1E56A0] hover:bg-[#0F2B4C] text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Car
              </button>
              <button onClick={() => setAdminOpen(false)} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                <X className="w-4 h-4" /> Close
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          {view === "list" && (
            <>
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center"><Car className="w-6 h-6 text-[#1E56A0]" /></div>
                  <div><p className="text-sm font-bold text-slate-400 uppercase">Total Inventory</p><p className="text-2xl font-black text-[#0D1B2A]">{totalCars}</p></div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center"><CheckCircle className="w-6 h-6 text-emerald-500" /></div>
                  <div><p className="text-sm font-bold text-slate-400 uppercase">Active Listings</p><p className="text-2xl font-black text-[#0D1B2A]">{activeCars}</p></div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center"><Banknote className="w-6 h-6 text-orange-500" /></div>
                  <div><p className="text-sm font-bold text-slate-400 uppercase">Sold Out</p><p className="text-2xl font-black text-[#0D1B2A]">{soldCars}</p></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {filteredVehicles.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No vehicles found matching your search.</div>
                  ) : (
                    filteredVehicles.map(v => (
                      <div key={v.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                        <img src={v.img} alt="car" className="w-28 h-20 object-cover rounded-md border border-slate-200 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-[#0D1B2A] text-lg leading-none">{v.make} {v.model} <span className="font-medium text-slate-500">{v.year}</span></h3>
                            {v.featured && <Star className="w-4 h-4 fill-amber-400 text-amber-400" title="Featured" />}
                            {v.badge && <span className={`px-2 py-0.5 text-[10px] font-bold rounded-sm uppercase ${v.badge === "Sold Out" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-[#1E56A0]"}`}>{v.badge}</span>}
                          </div>
                          <p className="text-sm text-slate-500 font-medium mb-1">
                            {v.variant} • Rs. {v.price.toLocaleString()} • {v.city}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:justify-end max-w-sm">
                          <button onClick={() => { setEditCar({...v}); setView("edit"); }} className="bg-white border border-slate-200 hover:border-[#1E56A0] text-slate-600 px-2.5 py-1.5 rounded text-xs font-bold transition-colors">Edit</button>
                          <button onClick={() => {
                            const newCar = { ...v, id: Date.now(), badge: "" };
                            VEHICLES.unshift(newCar);
                            forceUpdate((p: number) => p + 1);
                          }} className="bg-white border border-slate-200 hover:border-[#1E56A0] text-slate-600 px-2.5 py-1.5 rounded text-xs font-bold transition-colors" title="Duplicate Car">Copy</button>
                          
                          <button onClick={() => {
                            v.featured = !v.featured;
                            forceUpdate((p: number) => p + 1);
                          }} className="bg-white border border-slate-200 hover:border-amber-400 text-slate-600 px-2.5 py-1.5 rounded text-xs font-bold transition-colors">
                            {v.featured ? "Unfeature" : "Feature"}
                          </button>

                          {v.badge ? (
                            <button onClick={() => {
                              v.badge = "";
                              forceUpdate((p: number) => p + 1);
                            }} className="bg-slate-100 text-slate-600 hover:bg-slate-200 px-2.5 py-1.5 rounded text-xs font-bold transition-colors">Clear Badge</button>
                          ) : (
                            <>
                              <button onClick={() => {
                                v.badge = "Hot Sale";
                                forceUpdate((p: number) => p + 1);
                              }} className="bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-600 hover:text-white px-2.5 py-1.5 rounded text-xs font-bold transition-colors">Hot Sale</button>
                              <button onClick={() => {
                                v.badge = "Sold Out";
                                forceUpdate((p: number) => p + 1);
                              }} className="bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-500 hover:text-white px-2.5 py-1.5 rounded text-xs font-bold transition-colors">Sold</button>
                            </>
                          )}
                          
                          <button onClick={() => {
                            if(confirm('Are you sure you want to delete this car?')) {
                              VEHICLES = VEHICLES.filter(x => x.id !== v.id);
                              forceUpdate((p: number) => p + 1);
                            }
                          }} className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white px-2.5 py-1.5 rounded text-xs font-bold transition-colors">Delete</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {view === "edit" && editCar && (
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold mb-6 text-[#0D1B2A]">{editCar.id > 1000000000 ? "Add New Vehicle" : "Edit Vehicle Details"}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Make</label>
                  <input value={editCar.make} onChange={e => setEditCar({...editCar, make: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Model</label>
                  <input value={editCar.model} onChange={e => setEditCar({...editCar, model: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Variant</label>
                  <input value={editCar.variant} onChange={e => setEditCar({...editCar, variant: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Year</label>
                  <input type="number" value={editCar.year} onChange={e => setEditCar({...editCar, year: parseInt(e.target.value) || new Date().getFullYear()})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Price (PKR)</label>
                  <input type="number" value={editCar.price} onChange={e => setEditCar({...editCar, price: parseInt(e.target.value) || 0})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mileage (km)</label>
                  <input type="number" value={editCar.mileage} onChange={e => setEditCar({...editCar, mileage: parseInt(e.target.value) || 0})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image URL</label>
                  <input value={editCar.img} onChange={e => setEditCar({...editCar, img: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">City</label>
                  <input value={editCar.city} onChange={e => setEditCar({...editCar, city: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Condition</label>
                  <select value={editCar.condition} onChange={e => setEditCar({...editCar, condition: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]">
                    <option value="New">New</option><option value="Used">Used</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Body Type</label>
                  <select value={editCar.bodyType} onChange={e => setEditCar({...editCar, bodyType: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]">
                    <option value="Sedan">Sedan</option><option value="SUV">SUV</option><option value="Hatchback">Hatchback</option><option value="Crossover">Crossover</option><option value="Pickup">Pickup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Transmission</label>
                  <select value={editCar.transmission} onChange={e => setEditCar({...editCar, transmission: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]">
                    <option value="Automatic">Automatic</option><option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Fuel Type</label>
                  <select value={editCar.fuel} onChange={e => setEditCar({...editCar, fuel: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]">
                    <option value="Petrol">Petrol</option><option value="Diesel">Diesel</option><option value="Hybrid">Hybrid</option><option value="Electric">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Custom Badge</label>
                  <input placeholder="e.g. Best Seller" value={editCar.badge || ''} onChange={e => setEditCar({...editCar, badge: e.target.value})} className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#1E56A0]" />
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <input type="checkbox" id="featured" checked={editCar.featured || false} onChange={e => setEditCar({...editCar, featured: e.target.checked})} className="w-5 h-5 accent-[#1E56A0] rounded" />
                <label htmlFor="featured" className="font-bold text-[#0D1B2A] cursor-pointer">Mark as Featured Vehicle (Shows on Home Page)</label>
              </div>

              <div className="flex gap-3 justify-end pt-6 border-t border-slate-200">
                <button onClick={() => setView("list")} className="px-6 py-3 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button onClick={() => {
                  const idx = VEHICLES.findIndex(x => x.id === editCar.id);
                  if (idx >= 0) VEHICLES[idx] = editCar;
                  else VEHICLES.unshift(editCar);
                  forceUpdate((p: number) => p + 1);
                  setView("list");
                }} className="px-8 py-3 rounded-lg font-bold text-white bg-[#1E56A0] hover:bg-[#0F2B4C] transition-colors shadow-lg shadow-blue-900/20">Save Vehicle</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "a") {
        setAdminOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const AdminDashboard = () => {
    const [view, setView] = useState("list");
    const [editCar, setEditCar] = useState(null);

    if (!adminAuth) {
      return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-[#0D1B2A]">Admin Login</h2>
            <input type="password" placeholder="Password" className="w-full border rounded p-2 mb-4 text-[#0D1B2A]" value={password} onChange={e => setPassword(e.target.value)} />
            <div className="flex gap-2">
              <button className="flex-1 bg-slate-200 text-[#0D1B2A] p-2 rounded" onClick={() => setAdminOpen(false)}>Cancel</button>
              <button className="flex-1 bg-blue-600 text-white p-2 rounded" onClick={() => {
                if (password === "xyzadmin") setAdminAuth(true);
                else alert("Incorrect Password");
              }}>Login</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-white z-[100] overflow-y-auto text-[#0D1B2A]">
        <div className="max-w-5xl mx-auto p-6">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-4">
              <button onClick={() => { setEditCar({ id: Date.now(), make:"", model:"", variant:"", year:2024, price:0, mileage:0, transmission:"Automatic", fuel:"Petrol", city:"", condition:"New", bodyType:"Sedan", img:"", featured: false, badge: "" }); setView("edit"); }} className="bg-green-600 text-white px-4 py-2 rounded font-bold">+ Add Car</button>
              <button onClick={() => setAdminOpen(false)} className="bg-red-600 text-white px-4 py-2 rounded font-bold">Close</button>
            </div>
          </div>

          {view === "list" && (
            <div className="grid gap-4">
              {VEHICLES.map(v => (
                <div key={v.id} className="flex items-center gap-4 border p-4 rounded bg-slate-50">
                  <img src={v.img} alt="car" className="w-24 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-bold">{v.make} {v.model} {v.year}</h3>
                    <p className="text-sm text-slate-500">Rs. {v.price.toLocaleString()} | {v.condition} {v.badge ? `| Badge: ${v.badge}` : ""}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => { setEditCar({...v}); setView("edit"); }} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => {
                      VEHICLES = VEHICLES.filter(x => x.id !== v.id);
                      forceUpdate(p => p + 1);
                    }} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                    <button onClick={() => {
                      v.badge = "Sold Out";
                      forceUpdate(p => p + 1);
                    }} className="bg-orange-500 text-white px-3 py-1 rounded">Mark Sold</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === "edit" && editCar && (
            <div className="max-w-2xl bg-slate-50 p-6 rounded border">
              <h2 className="font-bold mb-4">{editCar.id > 1000 ? "Add New Car" : "Edit Car"}</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input placeholder="Make" value={editCar.make} onChange={e => setEditCar({...editCar, make: e.target.value})} className="border p-2 rounded" />
                <input placeholder="Model" value={editCar.model} onChange={e => setEditCar({...editCar, model: e.target.value})} className="border p-2 rounded" />
                <input placeholder="Variant" value={editCar.variant} onChange={e => setEditCar({...editCar, variant: e.target.value})} className="border p-2 rounded" />
                <input placeholder="Year" type="number" value={editCar.year} onChange={e => setEditCar({...editCar, year: parseInt(e.target.value)})} className="border p-2 rounded" />
                <input placeholder="Price" type="number" value={editCar.price} onChange={e => setEditCar({...editCar, price: parseInt(e.target.value)})} className="border p-2 rounded" />
                <input placeholder="Mileage" type="number" value={editCar.mileage} onChange={e => setEditCar({...editCar, mileage: parseInt(e.target.value)})} className="border p-2 rounded" />
                <input placeholder="Image URL" value={editCar.img} onChange={e => setEditCar({...editCar, img: e.target.value})} className="border p-2 rounded col-span-2" />
                <input placeholder="City" value={editCar.city} onChange={e => setEditCar({...editCar, city: e.target.value})} className="border p-2 rounded" />
                <select value={editCar.condition} onChange={e => setEditCar({...editCar, condition: e.target.value})} className="border p-2 rounded"><option value="New">New</option><option value="Used">Used</option></select>
                <select value={editCar.bodyType} onChange={e => setEditCar({...editCar, bodyType: e.target.value})} className="border p-2 rounded"><option value="Sedan">Sedan</option><option value="SUV">SUV</option><option value="Hatchback">Hatchback</option><option value="Crossover">Crossover</option><option value="Pickup">Pickup</option></select>
                <select value={editCar.transmission} onChange={e => setEditCar({...editCar, transmission: e.target.value})} className="border p-2 rounded"><option value="Automatic">Automatic</option><option value="Manual">Manual</option></select>
                <select value={editCar.fuel} onChange={e => setEditCar({...editCar, fuel: e.target.value})} className="border p-2 rounded"><option value="Petrol">Petrol</option><option value="Diesel">Diesel</option><option value="Hybrid">Hybrid</option><option value="CNG">CNG</option></select>
                <input placeholder="Badge (Optional)" value={editCar.badge || ''} onChange={e => setEditCar({...editCar, badge: e.target.value})} className="border p-2 rounded" />
                <label className="flex items-center gap-2"><input type="checkbox" checked={editCar.featured || false} onChange={e => setEditCar({...editCar, featured: e.target.checked})} /> Featured</label>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  const idx = VEHICLES.findIndex(x => x.id === editCar.id);
                  if (idx >= 0) VEHICLES[idx] = editCar;
                  else VEHICLES.unshift(editCar);
                  forceUpdate(p => p + 1);
                  setView("list");
                }} className="bg-green-600 text-white px-4 py-2 rounded font-bold">Save</button>
                <button onClick={() => setView("list")} className="bg-slate-300 px-4 py-2 rounded font-bold">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };


  const [page, setPage] = useState<Page>("home");
  const [selectedCar, setSelectedCar] = useState<Vehicle | null>(null);

  const navigate = useCallback((p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Plus Jakarta Sans', 'Manrope', sans-serif" }}>
      <Navbar page={page} setPage={navigate} />

      {page === "home" && <HomePage setPage={navigate} setSelectedCar={setSelectedCar} />}
      {page === "inventory" && <InventoryPage setPage={navigate} setSelectedCar={setSelectedCar} />}
      {page === "details" && selectedCar && <CarDetailsPage car={selectedCar} setPage={navigate} />}
      {page === "details" && !selectedCar && <InventoryPage setPage={navigate} setSelectedCar={setSelectedCar} />}
      {page === "rental" && <RentalPage setPage={navigate} />}
      {page === "sell" && <SellCarPage setPage={navigate} />}
      {page === "about" && <AboutPage setPage={navigate} />}
      
      {page === "contact" && <ContactPage setPage={navigate} />}

      <Footer setPage={navigate} />

      {adminOpen && <AdminDashboard adminAuth={adminAuth} setAdminAuth={setAdminAuth} setAdminOpen={setAdminOpen} forceUpdate={forceUpdate} />}
      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/923001234567"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-green-400 rounded-full flex items-center justify-center shadow-xl z-50 transition-all duration-200 hover:scale-110"
        title="WhatsApp XYZ Motors"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
