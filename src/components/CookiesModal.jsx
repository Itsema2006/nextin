import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccordionItem from './AccordionItem'; // same shared accordion used on Privacy Policy
import './Privacypolicy.css';

// ============================================================================
// Content sourced (meaning-preserved) from nextin.space/cookie-policy.html,
// translated to Hindi and Marathi. Same data-driven pattern as Privacypolicy.jsx
// so both pages share one mental model.
// type: 'paragraph' | 'list' | 'contact'
// ============================================================================
const CONTENT = {
  en: {
    code: 'EN',
    title: 'Cookie Policy',
    effectiveDateLabel: 'Effective Date:',
    effectiveDate: 'April 3, 2026',
    intro:
      'This Cookie Policy explains how NextIn (Next Innovations) uses cookies and similar technologies across our website, blog pages, and App Store-related integrations.',
    contactLinkText: 'Contact page',
    sections: [
      {
        number: '1',
        title: 'What Cookies Are',
        type: 'paragraph',
        text: 'Cookies are small data files stored on your browser or device to support core website behavior, analytics, and user preferences.'
      },
      {
        number: '2',
        title: 'Cookie Categories We Use',
        type: 'list',
        items: [
          { label: 'Essential cookies:', text: 'Required for navigation, security, and core page functions.' },
          { label: 'Functional cookies:', text: 'Store user preferences and improve usability.' },
          { label: 'Performance/analytics cookies:', text: 'Help us understand traffic behavior and improve content and performance.' },
          { label: 'Integration cookies:', text: 'May appear when interacting with third-party embeds or App Store-linked features.' }
        ]
      },
      {
        number: '3',
        title: 'First-Party vs Third-Party Cookies',
        type: 'paragraph',
        text: 'First-party cookies are set by our domain. Third-party cookies may be set by analytics providers, embedded media, integrations, or external tools.'
      },
      {
        number: '4',
        title: 'App Store and Blog-Related Technologies',
        type: 'paragraph',
        text: 'App listing modules, blog embeds, and external widgets may store identifiers under third-party control. Their cookie behavior is governed by their own policies.'
      },
      {
        number: '5',
        title: 'How to Manage Cookies',
        type: 'paragraph',
        text: 'You can manage or disable cookies through browser settings. Blocking essential cookies may affect access to some website features.'
      },
      {
        number: '6',
        title: 'Cookie Duration',
        type: 'paragraph',
        text: 'Some cookies are session-based and expire when you close your browser. Others remain for longer periods depending on purpose and provider settings.'
      },
      {
        number: '7',
        title: 'Do Not Track and Browser Signals',
        type: 'paragraph',
        text: 'Browser privacy controls vary by platform. We review and improve compatibility with modern privacy controls where practical.'
      },
      {
        number: '8',
        title: 'Policy Updates',
        type: 'paragraph',
        text: 'We may revise this Cookie Policy periodically to reflect operational, legal, or integration changes.'
      },
      {
        number: '9',
        title: 'Contact',
        type: 'contact',
        before: 'For cookie-related questions, please use our ',
        after: '.'
      }
    ]
  },

  hi: {
    code: 'HI',
    title: 'कुकी नीति',
    effectiveDateLabel: 'प्रभावी तिथि:',
    effectiveDate: '3 अप्रैल, 2026',
    intro:
      'यह कुकी नीति बताती है कि NextIn (Next Innovations) हमारी वेबसाइट, ब्लॉग पेजों और ऐप स्टोर से संबंधित इंटीग्रेशन में कुकीज़ और समान तकनीकों का उपयोग कैसे करता है।',
    contactLinkText: 'संपर्क पेज',
    sections: [
      {
        number: '1',
        title: 'कुकीज़ क्या हैं',
        type: 'paragraph',
        text: 'कुकीज़ छोटी डेटा फ़ाइलें हैं जो आपके ब्राउज़र या डिवाइस पर मुख्य वेबसाइट व्यवहार, एनालिटिक्स और उपयोगकर्ता वरीयताओं का समर्थन करने के लिए संग्रहीत की जाती हैं।'
      },
      {
        number: '2',
        title: 'हम जो कुकी श्रेणियाँ उपयोग करते हैं',
        type: 'list',
        items: [
          { label: 'आवश्यक कुकीज़:', text: 'नेविगेशन, सुरक्षा और मुख्य पेज कार्यों के लिए आवश्यक।' },
          { label: 'कार्यात्मक कुकीज़:', text: 'उपयोगकर्ता वरीयताओं को संग्रहीत करती हैं और उपयोगिता में सुधार करती हैं।' },
          { label: 'प्रदर्शन/एनालिटिक्स कुकीज़:', text: 'ट्रैफ़िक व्यवहार को समझने और सामग्री व प्रदर्शन में सुधार करने में हमारी मदद करती हैं।' },
          { label: 'इंटीग्रेशन कुकीज़:', text: 'तृतीय-पक्ष एम्बेड या ऐप स्टोर से जुड़ी सुविधाओं के साथ इंटरैक्ट करते समय दिखाई दे सकती हैं।' }
        ]
      },
      {
        number: '3',
        title: 'फर्स्ट-पार्टी बनाम थर्ड-पार्टी कुकीज़',
        type: 'paragraph',
        text: 'फर्स्ट-पार्टी कुकीज़ हमारे डोमेन द्वारा सेट की जाती हैं। थर्ड-पार्टी कुकीज़ एनालिटिक्स प्रदाताओं, एम्बेडेड मीडिया, इंटीग्रेशन या बाहरी टूल्स द्वारा सेट की जा सकती हैं।'
      },
      {
        number: '4',
        title: 'ऐप स्टोर और ब्लॉग-संबंधित तकनीकें',
        type: 'paragraph',
        text: 'ऐप लिस्टिंग मॉड्यूल, ब्लॉग एम्बेड और बाहरी विजेट तृतीय-पक्ष नियंत्रण के तहत पहचानकर्ता संग्रहीत कर सकते हैं। उनका कुकी व्यवहार उनकी अपनी नीतियों द्वारा नियंत्रित होता है।'
      },
      {
        number: '5',
        title: 'कुकीज़ प्रबंधित कैसे करें',
        type: 'paragraph',
        text: 'आप ब्राउज़र सेटिंग्स के माध्यम से कुकीज़ को प्रबंधित या अक्षम कर सकते हैं। आवश्यक कुकीज़ को ब्लॉक करने से वेबसाइट की कुछ सुविधाओं तक पहुँच प्रभावित हो सकती है।'
      },
      {
        number: '6',
        title: 'कुकी अवधि',
        type: 'paragraph',
        text: 'कुछ कुकीज़ सत्र-आधारित होती हैं और ब्राउज़र बंद करने पर समाप्त हो जाती हैं। अन्य उद्देश्य और प्रदाता सेटिंग्स के आधार पर लंबी अवधि तक बनी रहती हैं।'
      },
      {
        number: '7',
        title: 'डू नॉट ट्रैक और ब्राउज़र सिग्नल',
        type: 'paragraph',
        text: 'ब्राउज़र गोपनीयता नियंत्रण प्लेटफ़ॉर्म के अनुसार भिन्न होते हैं। हम व्यावहारिक रूप से आधुनिक गोपनीयता नियंत्रणों के साथ अनुकूलता की समीक्षा और सुधार करते हैं।'
      },
      {
        number: '8',
        title: 'नीति अद्यतन',
        type: 'paragraph',
        text: 'हम परिचालन, कानूनी या इंटीग्रेशन परिवर्तनों को दर्शाने के लिए समय-समय पर इस कुकी नीति को संशोधित कर सकते हैं।'
      },
      {
        number: '9',
        title: 'संपर्क करें',
        type: 'contact',
        before: 'कुकी संबंधी प्रश्नों के लिए, कृपया हमारे ',
        after: ' का उपयोग करें।'
      }
    ]
  },

  mr: {
    code: 'MR',
    title: 'कुकी धोरण',
    effectiveDateLabel: 'प्रभावी तारीख:',
    effectiveDate: '3 एप्रिल, 2026',
    intro:
      'हे कुकी धोरण स्पष्ट करते की NextIn (Next Innovations) आमच्या वेबसाइट, ब्लॉग पाने आणि अ‍ॅप स्टोअरशी संबंधित इंटिग्रेशन्समध्ये कुकीज आणि तत्सम तंत्रज्ञान कसे वापरते.',
    contactLinkText: 'संपर्क पान',
    sections: [
      {
        number: '1',
        title: 'कुकीज म्हणजे काय',
        type: 'paragraph',
        text: 'कुकीज या लहान डेटा फाइल्स आहेत ज्या तुमच्या ब्राउझर किंवा डिव्हाइसवर मुख्य वेबसाइट कार्य, अ‍ॅनालिटिक्स आणि वापरकर्ता प्राधान्यांना समर्थन देण्यासाठी साठवल्या जातात.'
      },
      {
        number: '2',
        title: 'आम्ही वापरत असलेल्या कुकी श्रेणी',
        type: 'list',
        items: [
          { label: 'आवश्यक कुकीज:', text: 'नेव्हिगेशन, सुरक्षा आणि मुख्य पान कार्यांसाठी आवश्यक.' },
          { label: 'कार्यात्मक कुकीज:', text: 'वापरकर्ता प्राधान्ये साठवतात आणि उपयोगिता सुधारतात.' },
          { label: 'कार्यक्षमता/अ‍ॅनालिटिक्स कुकीज:', text: 'ट्रॅफिक वर्तन समजून घेण्यास आणि सामग्री व कार्यक्षमता सुधारण्यास मदत करतात.' },
          { label: 'इंटिग्रेशन कुकीज:', text: 'तृतीय-पक्ष एम्बेड किंवा अ‍ॅप स्टोअर-संबंधित वैशिष्ट्यांशी संवाद साधताना दिसू शकतात.' }
        ]
      },
      {
        number: '3',
        title: 'फर्स्ट-पार्टी वि. थर्ड-पार्टी कुकीज',
        type: 'paragraph',
        text: 'फर्स्ट-पार्टी कुकीज आमच्या डोमेनद्वारे सेट केल्या जातात. थर्ड-पार्टी कुकीज अ‍ॅनालिटिक्स पुरवठादार, एम्बेडेड मीडिया, इंटिग्रेशन्स किंवा बाह्य साधनांद्वारे सेट केल्या जाऊ शकतात.'
      },
      {
        number: '4',
        title: 'अ‍ॅप स्टोअर आणि ब्लॉग-संबंधित तंत्रज्ञान',
        type: 'paragraph',
        text: 'अ‍ॅप लिस्टिंग मॉड्यूल्स, ब्लॉग एम्बेड्स आणि बाह्य विजेट्स तृतीय-पक्ष नियंत्रणाखाली आयडेंटिफायर्स साठवू शकतात. त्यांचे कुकी वर्तन त्यांच्या स्वतःच्या धोरणांद्वारे नियंत्रित केले जाते.'
      },
      {
        number: '5',
        title: 'कुकीज कशा व्यवस्थापित करायच्या',
        type: 'paragraph',
        text: 'तुम्ही ब्राउझर सेटिंग्जद्वारे कुकीज व्यवस्थापित किंवा अक्षम करू शकता. आवश्यक कुकीज ब्लॉक केल्याने वेबसाइटच्या काही वैशिष्ट्यांवरील प्रवेशावर परिणाम होऊ शकतो.'
      },
      {
        number: '6',
        title: 'कुकीचा कालावधी',
        type: 'paragraph',
        text: 'काही कुकीज सत्र-आधारित असतात आणि ब्राउझर बंद केल्यावर संपतात. इतर हेतू आणि पुरवठादार सेटिंग्जनुसार जास्त काळ राहतात.'
      },
      {
        number: '7',
        title: 'डू नॉट ट्रॅक आणि ब्राउझर सिग्नल्स',
        type: 'paragraph',
        text: 'ब्राउझर गोपनीयता नियंत्रणे प्लॅटफॉर्मनुसार बदलतात. आम्ही व्यावहारिकदृष्ट्या आधुनिक गोपनीयता नियंत्रणांशी सुसंगतता तपासतो आणि सुधारतो.'
      },
      {
        number: '8',
        title: 'धोरण अद्यतने',
        type: 'paragraph',
        text: 'ऑपरेशनल, कायदेशीर किंवा इंटिग्रेशन बदल प्रतिबिंबित करण्यासाठी आम्ही वेळोवेळी हे कुकी धोरण सुधारू शकतो.'
      },
      {
        number: '9',
        title: 'संपर्क',
        type: 'contact',
        before: 'कुकी-संबंधित प्रश्नांसाठी, कृपया आमच्या ',
        after: 'चा वापर करा.'
      }
    ]
  }
};

const LANGUAGE_ORDER = ['en', 'hi', 'mr'];

// Same country -> language pairing used on the Privacy Policy page, kept
// consistent so switching country behaves the same way on both pages.
const COUNTRIES = [
  { name: 'United States', language: 'en' },
  { name: 'India', language: 'hi' }
];

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
// between them via the /cookie-policy route — this file intentionally does
// NOT render its own Header/Footer.
export default function CookiePolicy() {
  const [openIndex, setOpenIndex] = useState(0); // first section open by default
  const [country, setCountry] = useState(COUNTRIES[0].name);
  const [language, setLanguage] = useState('en');

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