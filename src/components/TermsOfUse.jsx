import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccordionItem from './AccordionItem'; // same shared accordion used on Privacy Policy / Cookie Policy
import './Privacypolicy.css';

// ============================================================================
// Content sourced (meaning-preserved) from nextin.space/terms-and-conditions.html,
// translated to Hindi and Marathi. Same data-driven pattern as
// Privacypolicy.jsx / CookiesModal.jsx so all three legal pages share one
// mental model.
// type: 'paragraph' | 'contact'
// ============================================================================
const CONTENT = {
  en: {
    code: 'EN',
    title: 'Terms of Use',
    effectiveDateLabel: 'Effective Date:',
    effectiveDate: 'April 3, 2026',
    intro:
      'These Terms of Use govern your use of the NextIn (Next Innovations) website, service information, blog resources, and integrated App Store-related pathways.',
    contactLinkText: 'Contact page',
    sections: [
      {
        number: '1',
        title: 'Acceptance of Terms',
        type: 'paragraph',
        text: 'Using this site means agreeing to these Terms. If you disagree, please stop using the site.'
      },
      {
        number: '2',
        title: 'Permitted Use',
        type: 'paragraph',
        text: 'The site is meant for lawful information, communication, and business inquiry purposes. Misusing site functionality, interfering with operations, or attempting unauthorized access is not allowed.'
      },
      {
        number: '3',
        title: 'Service and Content Availability',
        type: 'paragraph',
        text: 'We may update, modify, suspend, or remove website content, service pages, or integrations at any time without prior notice.'
      },
      {
        number: '4',
        title: 'App Store Integrations and Third-Party Tools',
        type: 'paragraph',
        text: 'Where links or features connect to third-party app stores, APIs, libraries, payment processors, or embedded platforms, your use of those is governed by their own terms and policies.'
      },
      {
        number: '5',
        title: 'Blog and Informational Disclaimer',
        type: 'paragraph',
        text: 'Blog articles and technical posts are shared for general informational purposes only and do not constitute legal, financial, compliance, or professional advice.'
      },
      {
        number: '6',
        title: 'Intellectual Property Rights',
        type: 'paragraph',
        text: "All website design, branding, text, visuals, code, and original content are owned or licensed by NextIn (Next Innovations), unless explicitly stated otherwise."
      },
      {
        number: '7',
        title: 'User Submissions',
        type: 'paragraph',
        text: 'When you submit forms, messages, or feedback, you confirm the information is accurate and lawful, and that you have the right to provide it.'
      },
      {
        number: '8',
        title: 'External Links',
        type: 'paragraph',
        text: 'Links to external resources are provided for convenience. We are not responsible for third-party content, service reliability, or legal compliance.'
      },
      {
        number: '9',
        title: 'Limitation of Liability',
        type: 'paragraph',
        text: 'To the maximum extent permitted by law, NextIn (Next Innovations) is not liable for indirect, incidental, special, consequential, or reliance-based losses arising from use of this site or its third-party integrations.'
      },
      {
        number: '10',
        title: 'Indemnity',
        type: 'paragraph',
        text: 'You agree to indemnify and hold harmless NextIn (Next Innovations) from claims arising from your misuse of the website, policy violations, or unlawful activity.'
      },
      {
        number: '11',
        title: 'Governing Law and Jurisdiction',
        type: 'paragraph',
        text: 'These Terms are governed by the laws of India. Disputes are subject to applicable Indian jurisdiction.'
      },
      {
        number: '12',
        title: 'Updates to Terms',
        type: 'paragraph',
        text: 'We may revise these Terms periodically. Revisions take effect once published on this page.'
      },
      {
        number: '13',
        title: 'Contact',
        type: 'contact',
        before: 'For legal questions about these Terms, please use our ',
        after: '.'
      }
    ]
  },

  hi: {
    code: 'HI',
    title: 'उपयोग की शर्तें',
    effectiveDateLabel: 'प्रभावी तिथि:',
    effectiveDate: '3 अप्रैल, 2026',
    intro:
      'ये उपयोग की शर्तें बताती हैं कि आप NextIn (Next Innovations) की वेबसाइट, सेवा जानकारी, ब्लॉग संसाधनों और ऐप स्टोर से जुड़े इंटीग्रेशन का उपयोग कैसे कर सकते हैं।',
    contactLinkText: 'संपर्क पेज',
    sections: [
      {
        number: '1',
        title: 'शर्तों की स्वीकृति',
        type: 'paragraph',
        text: 'इस साइट का उपयोग करने का अर्थ है कि आप इन शर्तों से सहमत हैं। यदि आप सहमत नहीं हैं, तो कृपया साइट का उपयोग करना बंद कर दें।'
      },
      {
        number: '2',
        title: 'अनुमत उपयोग',
        type: 'paragraph',
        text: 'यह साइट कानूनी जानकारी, संचार और व्यावसायिक पूछताछ के उद्देश्यों के लिए है। साइट की कार्यक्षमता का दुरुपयोग करना, संचालन में बाधा डालना या अनधिकृत पहुँच का प्रयास करना अनुमति नहीं है।'
      },
      {
        number: '3',
        title: 'सेवा और सामग्री उपलब्धता',
        type: 'paragraph',
        text: 'हम बिना पूर्व सूचना के किसी भी समय वेबसाइट सामग्री, सेवा पेज या इंटीग्रेशन को अपडेट, संशोधित, निलंबित या हटा सकते हैं।'
      },
      {
        number: '4',
        title: 'ऐप स्टोर इंटीग्रेशन और थर्ड-पार्टी टूल्स',
        type: 'paragraph',
        text: 'जहाँ लिंक या सुविधाएँ तृतीय-पक्ष ऐप स्टोर, API, लाइब्रेरी, भुगतान प्रोसेसर या एम्बेडेड प्लेटफ़ॉर्म से जुड़ती हैं, वहाँ आपका उपयोग उन तृतीय-पक्ष शर्तों और नीतियों द्वारा नियंत्रित होता है।'
      },
      {
        number: '5',
        title: 'ब्लॉग और सूचनात्मक अस्वीकरण',
        type: 'paragraph',
        text: 'ब्लॉग लेख और तकनीकी पोस्ट केवल सामान्य जानकारी के लिए साझा किए जाते हैं और ये कानूनी, वित्तीय, अनुपालन या पेशेवर सलाह नहीं हैं।'
      },
      {
        number: '6',
        title: 'बौद्धिक संपदा अधिकार',
        type: 'paragraph',
        text: 'वेबसाइट का डिज़ाइन, ब्रांडिंग, टेक्स्ट, विज़ुअल्स, कोड और मूल सामग्री NextIn (Next Innovations) के स्वामित्व या लाइसेंस में है, जब तक कि स्पष्ट रूप से अन्यथा न बताया जाए।'
      },
      {
        number: '7',
        title: 'उपयोगकर्ता सबमिशन',
        type: 'paragraph',
        text: 'जब आप फ़ॉर्म, संदेश या फीडबैक सबमिट करते हैं, तो आप पुष्टि करते हैं कि जानकारी सटीक और कानूनी है, और आपके पास इसे प्रदान करने का अधिकार है।'
      },
      {
        number: '8',
        title: 'बाहरी लिंक',
        type: 'paragraph',
        text: 'बाहरी संसाधनों के लिंक सुविधा के लिए दिए जाते हैं। हम तृतीय-पक्ष सामग्री, सेवा विश्वसनीयता या कानूनी अनुपालन के लिए ज़िम्मेदार नहीं हैं।'
      },
      {
        number: '9',
        title: 'दायित्व की सीमा',
        type: 'paragraph',
        text: 'कानून द्वारा अनुमत अधिकतम सीमा तक, NextIn (Next Innovations) इस साइट या तृतीय-पक्ष इंटीग्रेशन के उपयोग से होने वाले अप्रत्यक्ष, आकस्मिक, विशेष, परिणामी या भरोसे पर आधारित नुकसान के लिए उत्तरदायी नहीं है।'
      },
      {
        number: '10',
        title: 'क्षतिपूर्ति',
        type: 'paragraph',
        text: 'आप वेबसाइट के दुरुपयोग, नीति उल्लंघन या गैरकानूनी गतिविधि से उत्पन्न दावों से NextIn (Next Innovations) को क्षतिपूर्ति देने और सुरक्षित रखने के लिए सहमत हैं।'
      },
      {
        number: '11',
        title: 'शासी कानून और क्षेत्राधिकार',
        type: 'paragraph',
        text: 'ये शर्तें भारत के कानूनों द्वारा शासित हैं। विवाद लागू भारतीय क्षेत्राधिकार के अधीन हैं।'
      },
      {
        number: '12',
        title: 'शर्तों में अपडेट',
        type: 'paragraph',
        text: 'हम समय-समय पर इन शर्तों को संशोधित कर सकते हैं। संशोधन इस पेज पर प्रकाशित होते ही प्रभावी हो जाते हैं।'
      },
      {
        number: '13',
        title: 'संपर्क करें',
        type: 'contact',
        before: 'इन शर्तों से संबंधित कानूनी प्रश्नों के लिए, कृपया हमारे ',
        after: ' का उपयोग करें।'
      }
    ]
  },

  mr: {
    code: 'MR',
    title: 'वापर अटी',
    effectiveDateLabel: 'प्रभावी तारीख:',
    effectiveDate: '3 एप्रिल, 2026',
    intro:
      'या वापर अटी स्पष्ट करतात की तुम्ही NextIn (Next Innovations) च्या वेबसाइट, सेवा माहिती, ब्लॉग संसाधने आणि अ‍ॅप स्टोअरशी संबंधित इंटिग्रेशन्सचा वापर कसा करू शकता.',
    contactLinkText: 'संपर्क पान',
    sections: [
      {
        number: '1',
        title: 'अटींची स्वीकृती',
        type: 'paragraph',
        text: 'या साइटचा वापर करणे म्हणजे तुम्ही या अटींशी सहमत आहात. जर तुम्ही सहमत नसाल, तर कृपया साइट वापरणे थांबवा.'
      },
      {
        number: '2',
        title: 'अनुमत वापर',
        type: 'paragraph',
        text: 'ही साइट कायदेशीर माहिती, संवाद आणि व्यावसायिक चौकशीच्या उद्देशांसाठी आहे. साइटच्या कार्यक्षमतेचा गैरवापर करणे, कामकाजात अडथळा आणणे किंवा अनधिकृत प्रवेशाचा प्रयत्न करणे परवानगी नाही.'
      },
      {
        number: '3',
        title: 'सेवा आणि सामग्री उपलब्धता',
        type: 'paragraph',
        text: 'आम्ही कोणत्याही वेळी पूर्वसूचनेशिवाय वेबसाइट सामग्री, सेवा पाने किंवा इंटिग्रेशन्स अद्ययावत, सुधारित, स्थगित किंवा काढून टाकू शकतो.'
      },
      {
        number: '4',
        title: 'अ‍ॅप स्टोअर इंटिग्रेशन्स आणि तृतीय-पक्ष साधने',
        type: 'paragraph',
        text: 'जिथे लिंक्स किंवा वैशिष्ट्ये तृतीय-पक्ष अ‍ॅप स्टोअर, API, लायब्ररी, पेमेंट प्रोसेसर किंवा एम्बेडेड प्लॅटफॉर्मशी जोडली जातात, तिथे तुमचा वापर त्या तृतीय-पक्ष अटी आणि धोरणांद्वारे नियंत्रित होतो.'
      },
      {
        number: '5',
        title: 'ब्लॉग आणि माहितीपर अस्वीकरण',
        type: 'paragraph',
        text: 'ब्लॉग लेख आणि तांत्रिक पोस्ट फक्त सामान्य माहितीसाठी दिल्या जातात आणि त्या कायदेशीर, आर्थिक, अनुपालन किंवा व्यावसायिक सल्ला नाहीत.'
      },
      {
        number: '6',
        title: 'बौद्धिक संपदा हक्क',
        type: 'paragraph',
        text: 'वेबसाइटची रचना, ब्रँडिंग, मजकूर, व्हिज्युअल्स, कोड आणि मूळ सामग्री NextIn (Next Innovations) च्या मालकीची किंवा परवानाकृत आहे, जोपर्यंत स्पष्टपणे वेगळे सांगितले नाही.'
      },
      {
        number: '7',
        title: 'वापरकर्ता सबमिशन',
        type: 'paragraph',
        text: 'जेव्हा तुम्ही फॉर्म, संदेश किंवा अभिप्राय सबमिट करता, तेव्हा तुम्ही पुष्टी करता की माहिती अचूक आणि कायदेशीर आहे, आणि ती देण्याचा तुम्हाला अधिकार आहे.'
      },
      {
        number: '8',
        title: 'बाह्य लिंक्स',
        type: 'paragraph',
        text: 'बाह्य संसाधनांच्या लिंक्स सोयीसाठी दिल्या जातात. तृतीय-पक्ष सामग्री, सेवा विश्वासार्हता किंवा कायदेशीर अनुपालनासाठी आम्ही जबाबदार नाही.'
      },
      {
        number: '9',
        title: 'दायित्वाची मर्यादा',
        type: 'paragraph',
        text: 'कायद्याने परवानगी दिलेल्या कमाल मर्यादेपर्यंत, या साइट किंवा तृतीय-पक्ष इंटिग्रेशन्सच्या वापरामुळे होणाऱ्या अप्रत्यक्ष, प्रासंगिक, विशेष, परिणामी किंवा विश्वासावर आधारित नुकसानीसाठी NextIn (Next Innovations) जबाबदार नाही.'
      },
      {
        number: '10',
        title: 'नुकसानभरपाई',
        type: 'paragraph',
        text: 'वेबसाइटचा गैरवापर, धोरण उल्लंघन किंवा बेकायदेशीर कृतीमुळे उद्भवणाऱ्या दाव्यांपासून NextIn (Next Innovations) ला नुकसानभरपाई देण्यास आणि सुरक्षित ठेवण्यास तुम्ही सहमत आहात.'
      },
      {
        number: '11',
        title: 'शासकीय कायदा आणि अधिकारक्षेत्र',
        type: 'paragraph',
        text: 'या अटी भारताच्या कायद्यांनुसार नियंत्रित आहेत. वाद लागू भारतीय अधिकारक्षेत्राच्या अधीन आहेत.'
      },
      {
        number: '12',
        title: 'अटींमधील अद्यतने',
        type: 'paragraph',
        text: 'आम्ही वेळोवेळी या अटी सुधारू शकतो. सुधारणा या पानावर प्रकाशित होताच लागू होतात.'
      },
      {
        number: '13',
        title: 'संपर्क',
        type: 'contact',
        before: 'या अटींबाबत कायदेशीर प्रश्नांसाठी, कृपया आमच्या ',
        after: 'चा वापर करा.'
      }
    ]
  }
};

const LANGUAGE_ORDER = ['en', 'hi', 'mr'];

// Same country -> language pairing used on Privacy Policy / Cookie Policy,
// kept consistent so switching country behaves the same on every legal page.
const COUNTRIES = [
  { name: 'United States', language: 'en' },
  { name: 'India', language: 'hi' }
];

function renderSectionBody(section, contactLinkText) {
  switch (section.type) {
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
// between them via the /terms-of-use route — this file intentionally does
// NOT render its own Header/Footer.
export default function TermsOfUse() {
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