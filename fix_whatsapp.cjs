const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

// Update phone display
content = content.replace(/0300-1234567/g, '0340-5463601');

// Update tel links
content = content.replace(/tel:\+923001234567/g, 'tel:+923405463601');

// Update wa.me links with custom context text
// 1. Line 563: Homepage CTA
content = content.replace(
  'href="https://wa.me/923001234567"', 
  'href="https://wa.me/923405463601?text=Assalam-o-Alaikum, mujhe aapki dealership se gaari kharidne ki details chahiye."'
);

// 2. Line 710: CarCard in InventoryPage
content = content.replace(
  'window.open("https://wa.me/923001234567")',
  'window.open(`https://wa.me/923405463601?text=Assalam-o-Alaikum, mujhe is gaari ki details chahiye: ${v.make} ${v.model} ${v.year}`)'
);

// 3. Line 907: CarDetailsPage Sidebar
content = content.replace(
  'href="https://wa.me/923001234567"',
  'href={`https://wa.me/923405463601?text=Assalam-o-Alaikum, mujhe is gaari ke baray mein mazeed maloomat chahiye: ${car.make} ${car.model} ${car.year}`}'
);

// 4. Line 1512: SellYourCarPage
content = content.replace(
  'href="https://wa.me/923001234567"',
  'href="https://wa.me/923405463601?text=Assalam-o-Alaikum, mujhe apni gaari sell karni hai. Tafseelaat bata dein."'
);

// 5. Line 1948: Floating Global Button
content = content.replace(
  'href="https://wa.me/923001234567"',
  'href="https://wa.me/923405463601?text=Assalam-o-Alaikum, mujhe XYZ Motors se rabta karna hai."'
);

fs.writeFileSync('src/app/App.tsx', content);
console.log("Done WhatsApp updates");
