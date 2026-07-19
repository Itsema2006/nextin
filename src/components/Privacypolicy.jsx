import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccordionItem from './AccordionItem'; // TODO: adjust path if you place this elsewhere
import './Privacypolicy.css';

// ============================================================================
// Full page content, translated per language. Meaning preserved from the
// original nextin.space/privacy-policy.html source (English), translated to
// Hindi and Marathi. Each section is data (not JSX) so the whole page can
// swap language at once.
// type: 'paragraph' | 'list' | 'contact'
// ============================================================================
const CONTENT = {
  en: {
    code: 'EN',
    label: 'English',
    title: 'Privacy Policy',
    effectiveDateLabel: 'Effective Date:',
    effectiveDate: 'April 3, 2026',
    intro:
      'This Privacy Policy explains how NextIn (Next Innovations) collects, uses, stores, and protects personal and usage information across our website, blog content, and App Store-linked experiences.',
    contactLinkText: 'Contact page',
    sections: [
      {
        number: '1',
        title: 'Scope of This Policy',
        type: 'paragraph',
        text: 'This policy applies to data collected when you browse our site, submit forms, contact us, read blog content, or interact with app listing and integration touchpoints.'
      },
      {
        number: '2',
        title: 'Information We Collect',
        type: 'list',
        items: [
          { label: 'Contact details:', text: 'Name, email, phone, and project details you submit.' },
          { label: 'Technical data:', text: 'Device type, browser, IP address, referral source, and usage behavior.' },
          { label: 'Preference data:', text: 'Language, session, and cookie-based settings.' },
          { label: 'Integration data:', text: 'Limited metadata from App Store or third-party embeds where applicable.' }
        ]
      },
      {
        number: '3',
        title: 'Why We Process Data',
        type: 'list',
        items: [
          { text: 'To respond to inquiries and provide support.' },
          { text: 'To improve website performance and user experience.' },
          { text: 'To analyze feature usage and content relevance.' },
          { text: 'To maintain platform security and prevent misuse.' }
        ]
      },
      {
        number: '4',
        title: 'App Store and Third-Party Integrations',
        type: 'paragraph',
        text: 'Some pages may connect to third-party app stores, analytics tools, APIs, or embedded services. These providers operate under their own privacy terms. We recommend reviewing their policies before interacting with third-party services.'
      },
      {
        number: '5',
        title: 'Blog Content and Public Information',
        type: 'paragraph',
        text: 'Blog posts are informational. If commenting or community features are added later, information posted publicly may be visible to others. Do not share sensitive personal or confidential data in public sections.'
      },
      {
        number: '6',
        title: 'Data Sharing',
        type: 'paragraph',
        text: 'We do not sell personal data. We may share limited data with trusted service providers for hosting, infrastructure, analytics, communication, legal compliance, or security operations.'
      },
      {
        number: '7',
        title: 'Data Retention',
        type: 'paragraph',
        text: 'Data is retained only for as long as necessary for operational, contractual, security, and legal requirements. Outdated or unnecessary data is periodically removed or anonymized where feasible.'
      },
      {
        number: '8',
        title: 'Security Measures',
        type: 'paragraph',
        text: 'We use reasonable technical and administrative controls to protect data. However, no internet transmission method is fully secure, and absolute security cannot be guaranteed.'
      },
      {
        number: '9',
        title: 'Your Rights',
        type: 'paragraph',
        text: 'You may request access, correction, or deletion of your personal information subject to legal and operational limits. You may also manage cookies via your browser settings.'
      },
      {
        number: '10',
        title: 'External Links',
        type: 'paragraph',
        text: 'Our site may contain third-party links. We are not responsible for external website privacy practices, policies, availability, or content accuracy.'
      },
      {
        number: '11',
        title: 'Changes to This Policy',
        type: 'paragraph',
        text: 'We may revise this policy over time. Updated versions become effective upon publication on this page with a revised effective date.'
      },
      {
        number: '12',
        title: 'Contact for Privacy Requests',
        type: 'contact',
        before: 'For privacy and data-related requests, use our ',
        after: ' or our office address listed in the website footer.'
      }
    ]
  },

  hi: {
    code: 'HI',
    label: 'हिन्दी',
    title: 'गोपनीयता नीति',
    effectiveDateLabel: 'प्रभावी तिथि:',
    effectiveDate: '3 अप्रैल, 2026',
    intro:
      'यह गोपनीयता नीति बताती है कि NextIn (Next Innovations) हमारी वेबसाइट, ब्लॉग सामग्री और ऐप स्टोर से जुड़े अनुभवों में व्यक्तिगत और उपयोग संबंधी जानकारी को कैसे एकत्र, उपयोग, संग्रहीत और सुरक्षित करता है।',
    contactLinkText: 'संपर्क पेज',
    sections: [
      {
        number: '1',
        title: 'इस नीति का दायरा',
        type: 'paragraph',
        text: 'यह नीति उस डेटा पर लागू होती है जो तब एकत्र किया जाता है जब आप हमारी साइट ब्राउज़ करते हैं, फ़ॉर्म जमा करते हैं, हमसे संपर्क करते हैं, ब्लॉग सामग्री पढ़ते हैं, या ऐप लिस्टिंग और इंटीग्रेशन टचपॉइंट्स के साथ इंटरैक्ट करते हैं।'
      },
      {
        number: '2',
        title: 'हम जो जानकारी एकत्र करते हैं',
        type: 'list',
        items: [
          { label: 'संपर्क विवरण:', text: 'आपके द्वारा प्रस्तुत नाम, ईमेल, फ़ोन और प्रोजेक्ट विवरण।' },
          { label: 'तकनीकी डेटा:', text: 'डिवाइस प्रकार, ब्राउज़र, IP पता, रेफरल स्रोत और उपयोग व्यवहार।' },
          { label: 'वरीयता डेटा:', text: 'भाषा, सत्र और कुकी-आधारित सेटिंग्स।' },
          { label: 'इंटीग्रेशन डेटा:', text: 'लागू होने पर ऐप स्टोर या तृतीय-पक्ष एम्बेड से सीमित मेटाडेटा।' }
        ]
      },
      {
        number: '3',
        title: 'हम डेटा क्यों प्रोसेस करते हैं',
        type: 'list',
        items: [
          { text: 'पूछताछ का जवाब देने और सहायता प्रदान करने के लिए।' },
          { text: 'वेबसाइट के प्रदर्शन और उपयोगकर्ता अनुभव को बेहतर बनाने के लिए।' },
          { text: 'फ़ीचर उपयोग और सामग्री प्रासंगिकता का विश्लेषण करने के लिए।' },
          { text: 'प्लेटफ़ॉर्म सुरक्षा बनाए रखने और दुरुपयोग को रोकने के लिए।' }
        ]
      },
      {
        number: '4',
        title: 'ऐप स्टोर और तृतीय-पक्ष इंटीग्रेशन',
        type: 'paragraph',
        text: 'कुछ पेज तृतीय-पक्ष ऐप स्टोर, एनालिटिक्स टूल, API या एम्बेडेड सेवाओं से जुड़ सकते हैं। ये प्रदाता अपनी स्वयं की गोपनीयता शर्तों के तहत कार्य करते हैं। तृतीय-पक्ष सेवाओं के साथ इंटरैक्ट करने से पहले उनकी नीतियों की समीक्षा करने की सलाह दी जाती है।'
      },
      {
        number: '5',
        title: 'ब्लॉग सामग्री और सार्वजनिक जानकारी',
        type: 'paragraph',
        text: 'ब्लॉग पोस्ट केवल जानकारी के लिए हैं। यदि बाद में कमेंटिंग या कम्युनिटी फ़ीचर जोड़े जाते हैं, तो सार्वजनिक रूप से पोस्ट की गई जानकारी दूसरों को दिखाई दे सकती है। कृपया सार्वजनिक सेक्शन में संवेदनशील व्यक्तिगत या गोपनीय डेटा साझा न करें।'
      },
      {
        number: '6',
        title: 'डेटा साझाकरण',
        type: 'paragraph',
        text: 'हम व्यक्तिगत डेटा नहीं बेचते। हम होस्टिंग, इंफ्रास्ट्रक्चर, एनालिटिक्स, संचार, कानूनी अनुपालन या सुरक्षा संचालन के लिए विश्वसनीय सेवा प्रदाताओं के साथ सीमित डेटा साझा कर सकते हैं।'
      },
      {
        number: '7',
        title: 'डेटा प्रतिधारण',
        type: 'paragraph',
        text: 'डेटा को केवल तब तक बनाए रखा जाता है जब तक परिचालन, संविदात्मक, सुरक्षा और कानूनी आवश्यकताओं के लिए आवश्यक हो। पुराना या अनावश्यक डेटा समय-समय पर हटाया या जहाँ संभव हो, अनाम कर दिया जाता है।'
      },
      {
        number: '8',
        title: 'सुरक्षा उपाय',
        type: 'paragraph',
        text: 'हम डेटा की सुरक्षा के लिए उचित तकनीकी और प्रशासनिक नियंत्रणों का उपयोग करते हैं। हालांकि, कोई भी इंटरनेट ट्रांसमिशन विधि पूरी तरह सुरक्षित नहीं है, और पूर्ण सुरक्षा की गारंटी नहीं दी जा सकती।'
      },
      {
        number: '9',
        title: 'आपके अधिकार',
        type: 'paragraph',
        text: 'कानूनी और परिचालन सीमाओं के अधीन, आप अपनी व्यक्तिगत जानकारी तक पहुँच, सुधार या हटाने का अनुरोध कर सकते हैं। आप अपनी ब्राउज़र सेटिंग्स के माध्यम से कुकीज़ को भी प्रबंधित कर सकते हैं।'
      },
      {
        number: '10',
        title: 'बाहरी लिंक',
        type: 'paragraph',
        text: 'हमारी साइट में तृतीय-पक्ष लिंक हो सकते हैं। हम बाहरी वेबसाइट की गोपनीयता प्रथाओं, नीतियों, उपलब्धता या सामग्री की सटीकता के लिए ज़िम्मेदार नहीं हैं।'
      },
      {
        number: '11',
        title: 'इस नीति में परिवर्तन',
        type: 'paragraph',
        text: 'हम समय-समय पर इस नीति में संशोधन कर सकते हैं। अद्यतन संस्करण संशोधित प्रभावी तिथि के साथ इस पेज पर प्रकाशित होने पर प्रभावी हो जाते हैं।'
      },
      {
        number: '12',
        title: 'गोपनीयता अनुरोधों के लिए संपर्क करें',
        type: 'contact',
        before: 'गोपनीयता और डेटा से संबंधित अनुरोधों के लिए, हमारे ',
        after: ' या वेबसाइट फ़ुटर में सूचीबद्ध हमारे कार्यालय के पते का उपयोग करें।'
      }
    ]
  },

  mr: {
    code: 'MR',
    label: 'मराठी',
    title: 'गोपनीयता धोरण',
    effectiveDateLabel: 'प्रभावी तारीख:',
    effectiveDate: '3 एप्रिल, 2026',
    intro:
      'हे गोपनीयता धोरण स्पष्ट करते की NextIn (Next Innovations) आमच्या वेबसाइट, ब्लॉग सामग्री आणि अ‍ॅप स्टोअरशी संबंधित अनुभवांमध्ये वैयक्तिक आणि वापर माहिती कशी गोळा करते, वापरते, साठवते आणि सुरक्षित ठेवते.',
    contactLinkText: 'संपर्क पान',
    sections: [
      {
        number: '1',
        title: 'या धोरणाची व्याप्ती',
        type: 'paragraph',
        text: 'हे धोरण त्या डेटावर लागू होते जो तुम्ही आमची साइट ब्राउझ करता, फॉर्म सबमिट करता, आमच्याशी संपर्क साधता, ब्लॉग सामग्री वाचता किंवा अ‍ॅप लिस्टिंग आणि इंटिग्रेशन टचपॉइंट्सशी संवाद साधता तेव्हा गोळा केला जातो.'
      },
      {
        number: '2',
        title: 'आम्ही गोळा करत असलेली माहिती',
        type: 'list',
        items: [
          { label: 'संपर्क तपशील:', text: 'तुम्ही सादर केलेले नाव, ईमेल, फोन आणि प्रकल्प तपशील.' },
          { label: 'तांत्रिक डेटा:', text: 'डिव्हाइस प्रकार, ब्राउझर, IP पत्ता, रेफरल स्रोत आणि वापर वर्तन.' },
          { label: 'प्राधान्य डेटा:', text: 'भाषा, सत्र आणि कुकी-आधारित सेटिंग्ज.' },
          { label: 'इंटिग्रेशन डेटा:', text: 'लागू असल्यास अ‍ॅप स्टोअर किंवा तृतीय-पक्ष एम्बेडमधून मर्यादित मेटाडेटा.' }
        ]
      },
      {
        number: '3',
        title: 'आम्ही डेटावर प्रक्रिया का करतो',
        type: 'list',
        items: [
          { text: 'चौकशींना उत्तर देण्यासाठी आणि सहाय्य पुरवण्यासाठी.' },
          { text: 'वेबसाइटची कार्यक्षमता आणि वापरकर्ता अनुभव सुधारण्यासाठी.' },
          { text: 'फीचर वापर आणि सामग्रीची प्रासंगिकता तपासण्यासाठी.' },
          { text: 'प्लॅटफॉर्म सुरक्षितता राखण्यासाठी आणि गैरवापर रोखण्यासाठी.' }
        ]
      },
      {
        number: '4',
        title: 'अ‍ॅप स्टोअर आणि तृतीय-पक्ष इंटिग्रेशन',
        type: 'paragraph',
        text: 'काही पाने तृतीय-पक्ष अ‍ॅप स्टोअर, अ‍ॅनालिटिक्स साधने, API किंवा एम्बेडेड सेवांशी जोडली जाऊ शकतात. हे प्रदाता त्यांच्या स्वतःच्या गोपनीयता अटींनुसार कार्य करतात. तृतीय-पक्ष सेवांशी संवाद साधण्यापूर्वी त्यांची धोरणे तपासण्याची शिफारस केली जाते.'
      },
      {
        number: '5',
        title: 'ब्लॉग सामग्री आणि सार्वजनिक माहिती',
        type: 'paragraph',
        text: 'ब्लॉग पोस्ट केवळ माहितीच्या उद्देशाने आहेत. भविष्यात कमेंटिंग किंवा कम्युनिटी फीचर्स जोडल्यास, सार्वजनिकरित्या पोस्ट केलेली माहिती इतरांना दिसू शकते. कृपया सार्वजनिक विभागांमध्ये संवेदनशील वैयक्तिक किंवा गोपनीय डेटा शेअर करू नका.'
      },
      {
        number: '6',
        title: 'डेटा शेअरिंग',
        type: 'paragraph',
        text: 'आम्ही वैयक्तिक डेटा विकत नाही. आम्ही होस्टिंग, इन्फ्रास्ट्रक्चर, अ‍ॅनालिटिक्स, संवाद, कायदेशीर अनुपालन किंवा सुरक्षा कामकाजासाठी विश्वासार्ह सेवा पुरवठादारांसोबत मर्यादित डेटा शेअर करू शकतो.'
      },
      {
        number: '7',
        title: 'डेटा धारणा',
        type: 'paragraph',
        text: 'डेटा फक्त तितकाच काळ ठेवला जातो जितका ऑपरेशनल, कराराशी संबंधित, सुरक्षा आणि कायदेशीर गरजांसाठी आवश्यक असतो. जुना किंवा अनावश्यक डेटा वेळोवेळी काढला जातो किंवा शक्य असेल तिथे अनामिक केला जातो.'
      },
      {
        number: '8',
        title: 'सुरक्षा उपाय',
        type: 'paragraph',
        text: 'आम्ही डेटाचे संरक्षण करण्यासाठी योग्य तांत्रिक आणि प्रशासकीय नियंत्रणे वापरतो. तथापि, कोणतीही इंटरनेट ट्रान्समिशन पद्धत पूर्णपणे सुरक्षित नसते आणि पूर्ण सुरक्षिततेची हमी दिली जाऊ शकत नाही.'
      },
      {
        number: '9',
        title: 'तुमचे अधिकार',
        type: 'paragraph',
        text: 'कायदेशीर आणि कार्यान्वयन मर्यादांच्या अधीन राहून, तुम्ही तुमच्या वैयक्तिक माहितीचा प्रवेश, दुरुस्ती किंवा हटवण्याची विनंती करू शकता. तुम्ही तुमच्या ब्राउझर सेटिंग्जद्वारे कुकीज देखील व्यवस्थापित करू शकता.'
      },
      {
        number: '10',
        title: 'बाह्य दुवे',
        type: 'paragraph',
        text: 'आमच्या साइटवर तृतीय-पक्ष दुवे असू शकतात. बाह्य वेबसाइटच्या गोपनीयता पद्धती, धोरणे, उपलब्धता किंवा सामग्रीच्या अचूकतेसाठी आम्ही जबाबदार नाही.'
      },
      {
        number: '11',
        title: 'या धोरणातील बदल',
        type: 'paragraph',
        text: 'आम्ही वेळोवेळी हे धोरण सुधारू शकतो. सुधारित आवृत्त्या या पानावर प्रकाशित झाल्यावर, सुधारित प्रभावी तारखेसह लागू होतात.'
      },
      {
        number: '12',
        title: 'गोपनीयता विनंत्यांसाठी संपर्क',
        type: 'contact',
        before: 'गोपनीयता आणि डेटा-संबंधित विनंत्यांसाठी, आमच्या ',
        after: ' किंवा वेबसाइट फूटरमध्ये सूचीबद्ध केलेल्या आमच्या कार्यालयाच्या पत्त्याचा वापर करा.'
      }
    ]
  }
};

const LANGUAGE_ORDER = ['en', 'hi', 'mr'];

// Only two countries, each tied to a default language. Picking a country
// also switches the page language; the language dropdown still lets the
// user manually pick Marathi (or override) afterward.
const COUNTRIES = [
  { name: 'United States', language: 'en' },
  { name: 'India', language: 'hi' }
];

// Turns a data-only section (paragraph / list / contact) into the JSX body
// AccordionItem expects, for the currently selected language.
function renderSectionBody(section, contactLinkText) {
  switch (section.type) {
    case 'list':
      return (
        <ul>
          {section.items.map((item, i) => (
            <li key={i}>
              {item.label ? <strong>{item.label}</strong> : null}
              {item.label ? ' ' : ''}
              {item.text}
            </li>
          ))}
        </ul>
      );
    case 'contact':
      return (
        <p>
          {section.before}
          <Link to="/contact">{contactLinkText}</Link>
          {section.after}
        </p>
      );
    case 'paragraph':
    default:
      return <p>{section.text}</p>;
  }
}

// NOTE: Navbar and Footer already exist in App.jsx and render this component
// between them via the /privacy-policy route — this file intentionally does
// NOT render its own Header/Footer.
export default function PrivacyPolicy() {
  const [openIndex, setOpenIndex] = useState(0); // first section open by default
  const [country, setCountry] = useState(COUNTRIES[0].name);
  const [language, setLanguage] = useState('en');

  // React Router doesn't reset scroll position on navigation — without this,
  // clicking the footer link while scrolled down on another page lands here
  // still scrolled down instead of at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleSection = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  const handleCountryChange = (e) => {
    const selectedName = e.target.value;
    setCountry(selectedName);
    const match = COUNTRIES.find((c) => c.name === selectedName);
    if (match) setLanguage(match.language);
  };

  const content = CONTENT[language];

  return (
    <main className="pp-page" lang={language}>
      <div className="pp-container">
        {/* Top utility row: country selector (also switches language) + language selector */}
        <div className="pp-utility-row">
          <div className="pp-select-wrap">
            <select
              className="pp-select"
              value={country}
              onChange={handleCountryChange}
              aria-label="Select country"
            >
              {COUNTRIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <span className="pp-select-caret" aria-hidden="true">▾</span>
          </div>

          <div className="pp-select-wrap">
            <select
              className="pp-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Select language"
            >
              {LANGUAGE_ORDER.map((code) => (
                <option key={code} value={code}>
                  {CONTENT[code].code}
                </option>
              ))}
            </select>
            <span className="pp-select-caret" aria-hidden="true">▾</span>
          </div>
        </div>

        <h1 className="pp-title">{content.title}</h1>

        <div className="pp-lead">
          <p className="pp-effective-date">
            <strong>{content.effectiveDateLabel}</strong> {content.effectiveDate}
          </p>
          <p>{content.intro}</p>
        </div>

        <div className="pp-accordion-card">
          {content.sections.map((section, index) => (
            <AccordionItem
              key={section.number}
              section={{
                number: section.number,
                title: section.title,
                body: renderSectionBody(section, content.contactLinkText)
              }}
              isOpen={openIndex === index}
              onToggle={() => toggleSection(index)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}