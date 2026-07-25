const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

const newInventoryPage = `function InventoryPage({ setPage, setSelectedCar }: { setPage: (p: Page) => void; setSelectedCar: (v: Vehicle) => void }) {
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
              <button onClick={() => setView("grid")} className={\`p-1.5 rounded transition-colors \${view === "grid" ? "bg-white shadow text-[#0F2B4C]" : "text-slate-400 hover:text-slate-600"}\`}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setView("list")} className={\`p-1.5 rounded transition-colors \${view === "list" ? "bg-white shadow text-[#0F2B4C]" : "text-slate-400 hover:text-slate-600"}\`}>
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
                    <img src={v.img} alt={\`\${v.make} \${v.model}\`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600"><Gauge className="w-4 h-4 text-slate-400" />{v.mileage === 0 ? "0 km" : \`\${v.mileage.toLocaleString()} km\`}</span>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600"><Settings2 className="w-4 h-4 text-slate-400" />{v.transmission}</span>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600"><Fuel className="w-4 h-4 text-slate-400" />{v.fuel}</span>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600"><MapPin className="w-4 h-4 text-slate-400" />{v.city}</span>
                      <span className={\`text-[10px] font-bold uppercase px-2 py-0.5 rounded \${v.condition === "New" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}\`}>{v.condition}</span>
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
}`;

const regex = /function InventoryPage\(\{ setPage, setSelectedCar \}: \{ setPage: \(p: Page\) => void; setSelectedCar: \(v: Vehicle\) => void \}\) \{[\s\S]*?\n  \);\n\}\n/;
content = content.replace(regex, newInventoryPage + '\n');

fs.writeFileSync('src/app/App.tsx', content);
console.log("Done updates 8");
