import ImageCompressor from '../tools/ImageCompressor'
import ImageResizer from '../tools/ImageResizer'
import PDFTools from '../tools/PDFTools'
import URLShortener from '../tools/URLShortener'
import TextTools from '../tools/TextTools'
import FileConverter from '../tools/FileConverter'
import ColorPicker from '../tools/ColorPicker'
import PasswordGenerator from '../tools/PasswordGenerator'
import QRCodeGenerator from '../tools/QRCodeGenerator'
import NameGenerator from '../tools/NameGenerator'
import JSONFormatter from '../tools/JSONFormatter'
import UnitConverter from '../tools/UnitConverter'
import LoanCalculator from '../tools/LoanCalculator'
import CurrencyConverter from '../tools/CurrencyConverter'
import PercentageCalculator from '../tools/PercentageCalculator'
import InvoiceGenerator from '../tools/InvoiceGenerator'
import PDFEditor from '../tools/PDFEditor'
import PDFToDOCX from '../tools/PDFToDOCX'
import JPGToPDF from '../tools/JPGToPDF'
import Base64Tool from '../tools/Base64Tool'
import MetaTagTool from '../tools/MetaTagTool'
import LogoGenerator from '../tools/LogoGenerator'
import TextDiff from '../tools/TextDiff'
import UUIDGenerator from '../tools/UUIDGenerator'
import HashGenerator from '../tools/HashGenerator'
import FaviconGenerator from '../tools/FaviconGenerator'
import SVGOptimizer from '../tools/SVGOptimizer'
import ImageToSVG from '../tools/ImageToSVG'
import CSSFormatter from '../tools/CSSFormatter'
import HTMLFormatter from '../tools/HTMLFormatter'

const toolsData = {


  'image-compressor': {
    name: 'Image Compressor',
    seoTitle: 'Free Image Compressor Online',
    seoDescription: 'Compress JPG, PNG and WebP images online for free with KumpiHub.',
    description: 'KumpiHub Image Compressor lets you reduce image file size quickly while keeping great image quality.',
    component: <ImageCompressor />,
    howToUse: [
      'Choose an image from your device.',
      'Select your preferred compression quality.',
      'Click the Compress Image button.',
      'Download your compressed image.'
    ],
    faqs: [
      {
        question: 'Is KumpiHub Image Compressor free?',
        answer: 'Yes. KumpiHub Image Compressor is free to use.'
      },
      {
        question: 'Can I use it on my phone?',
        answer: 'Yes. The tool works on both mobile devices and computers.'
      }
    ]
  },

  'image-resizer': {
    name: 'Image Resizer',
    seoTitle: 'Free Image Resizer Online',
    seoDescription: 'Resize JPG, PNG and WebP images online quickly and easily.',
    description: 'Resize your images to the size you need with KumpiHub Image Resizer.',
    component: <ImageResizer />,
    howToUse: [
      'Choose an image from your device.',
      'Enter your preferred image dimensions.',
      'Resize the image.',
      'Download your resized image.'
    ],
    faqs: [
      {
        question: 'Is the Image Resizer free?',
        answer: 'Yes. KumpiHub Image Resizer is free to use.'
      }
    ]
  },

  'pdf-tools': {
    name: 'PDF Tools',
    seoTitle: 'Free Online PDF Tools',
    seoDescription: 'Merge, split, compress and work with PDF files online for free.',
    description: 'KumpiHub PDF Tools provides useful tools for working with PDF files.',
    component: <PDFTools />,
    howToUse: [
      'Choose the PDF tool you need.',
      'Upload your PDF file.',
      'Apply the selected PDF operation.',
      'Download your result.'
    ],
    faqs: [
      {
        question: 'Are KumpiHub PDF Tools free?',
        answer: 'Yes. KumpiHub PDF Tools are free to use.'
      }
    ]
  },

  'url-shortener': {
    name: 'URL Shortener',
    seoTitle: 'Free URL Shortener Online',
    seoDescription: 'Shorten long URLs quickly and easily with KumpiHub.',
    description: 'Create shorter and easier-to-share links with KumpiHub URL Shortener.',
    component: <URLShortener />,
    howToUse: [
      'Paste your long URL.',
      'Click the shorten button.',
      'Copy your shortened URL.',
      'Share your new link.'
    ],
    faqs: [
      {
        question: 'Is the URL Shortener free?',
        answer: 'Yes. KumpiHub URL Shortener is free to use.'
      }
    ]
  },

  'text-tools': {
    name: 'Text Tools',
    seoTitle: 'Free Online Text Tools',
    seoDescription: 'Format, analyze and transform text online with KumpiHub Text Tools.',
    description: 'KumpiHub Text Tools provides useful features for working with text.',
    component: <TextTools />,
    howToUse: [
      'Enter or paste your text.',
      'Choose the text operation you need.',
      'Apply the selected tool.',
      'Copy your result.'
    ],
    faqs: [
      {
        question: 'Are Text Tools free?',
        answer: 'Yes. KumpiHub Text Tools are free to use.'
      }
    ]
  },

  'file-converter': {
    name: 'File Converter',
    seoTitle: 'Free Online File Converter',
    seoDescription: 'Convert files between supported formats online with KumpiHub.',
    description: 'KumpiHub File Converter helps you convert files between supported formats.',
    component: <FileConverter />,
    howToUse: [
      'Choose a file.',
      'Select the output format.',
      'Convert your file.',
      'Download the converted file.'
    ],
    faqs: [
      {
        question: 'Is the File Converter free?',
        answer: 'Yes. KumpiHub File Converter is free to use.'
      }
    ]
  },

  'color-picker': {
    name: 'Color Picker',
    seoTitle: 'Free Online Color Picker',
    seoDescription: 'Pick colors and get HEX codes easily with KumpiHub Color Picker.',
    description: 'Choose colors and quickly get useful color codes with KumpiHub Color Picker.',
    component: <ColorPicker />,
    howToUse: [
      'Choose a color.',
      'Adjust the color if needed.',
      'View the color code.',
      'Copy the HEX code.'
    ],
    faqs: [
      {
        question: 'Is the Color Picker free?',
        answer: 'Yes. KumpiHub Color Picker is free to use.'
      }
    ]
  },

  'password-generator': {
    name: 'Password Generator',
    seoTitle: 'Free Password Generator Online',
    seoDescription: 'Generate strong and secure passwords online for free.',
    description: 'Create strong passwords quickly with KumpiHub Password Generator.',
    component: <PasswordGenerator />,
    howToUse: [
      'Choose your password options.',
      'Set the desired password length.',
      'Generate your password.',
      'Copy the generated password.'
    ],
    faqs: [
      {
        question: 'Is the Password Generator free?',
        answer: 'Yes. KumpiHub Password Generator is free to use.'
      }
    ]
  },

  'qr-code-generator': {
    name: 'QR Code Generator',
    seoTitle: 'Free QR Code Generator Online',
    seoDescription: 'Create QR codes for links and text quickly with KumpiHub.',
    description: 'Create QR codes for URLs, text and other supported information.',
    component: <QRCodeGenerator />,
    howToUse: [
      'Enter your text or URL.',
      'Generate your QR code.',
      'Preview the QR code.',
      'Download or save it.'
    ],
    faqs: [
      {
        question: 'Is the QR Code Generator free?',
        answer: 'Yes. KumpiHub QR Code Generator is free to use.'
      }
    ]
  },

  'name-generator': {
    name: 'Name Generator',
    seoTitle: 'Free Name Generator Online',
    seoDescription: 'Generate unique usernames, gaming, business and creator names.',
    description: 'Generate creative names for usernames, gaming, business and content creators.',
    component: <NameGenerator />,
    howToUse: [
      'Choose a category.',
      'Select a style.',
      'Click Generate Names.',
      'Copy your favorite name.'
    ],
    faqs: [
      {
        question: 'Is the Name Generator free?',
        answer: 'Yes. KumpiHub Name Generator is free to use.'
      }
    ]
  },

  'json-formatter': {
    name: 'JSON Formatter',
    seoTitle: 'Free JSON Formatter Online',
    seoDescription: 'Format, validate and beautify JSON data online for free.',
    description: 'Format and validate JSON data quickly with KumpiHub JSON Formatter.',
    component: <JSONFormatter />,
    howToUse: [
      'Paste your JSON data.',
      'Format or validate the JSON.',
      'Review the formatted result.',
      'Copy the result.'
    ],
    faqs: [
      {
        question: 'Is the JSON Formatter free?',
        answer: 'Yes. KumpiHub JSON Formatter is free to use.'
      }
    ]
  },

  'unit-converter': {
    name: 'Unit Converter',
    seoTitle: 'Free Unit Converter Online',
    seoDescription: 'Convert length, weight, temperature and time units online.',
    description: 'Convert common units quickly with KumpiHub Unit Converter.',
    component: <UnitConverter />,
    howToUse: [
      'Choose the unit category.',
      'Select the units you want to convert.',
      'Enter the value.',
      'View the converted result.'
    ],
    faqs: [
      {
        question: 'Is the Unit Converter free?',
        answer: 'Yes. KumpiHub Unit Converter is free to use.'
      }
    ]
  },

  'loan-calculator': {
    name: 'Loan Calculator',
    seoTitle: 'Free Loan Calculator Online',
    seoDescription: 'Calculate monthly payments, interest and loan repayment schedules.',
    description: 'Calculate loan payments, total interest and repayment information with KumpiHub Loan Calculator.',
    component: <LoanCalculator />,
    howToUse: [
      'Enter the loan amount.',
      'Enter the interest rate.',
      'Choose the loan term.',
      'Calculate your repayment.'
    ],
    faqs: [
      {
        question: 'Is the Loan Calculator free?',
        answer: 'Yes. KumpiHub Loan Calculator is free to use.'
      }
    ]
  },

  'currency-converter': {
    name: 'Currency Converter',
    seoTitle: 'Free Currency Converter Online',
    seoDescription: 'Convert currencies quickly with KumpiHub Currency Converter.',
    description: 'Convert between supported currencies using available exchange rates.',
    component: <CurrencyConverter />,
    howToUse: [
      'Enter the amount.',
      'Choose the currencies.',
      'View the converted result.',
      'Use the result for your calculation.'
    ],
    faqs: [
      {
        question: 'Is the Currency Converter free?',
        answer: 'Yes. KumpiHub Currency Converter is free to use.'
      }
    ]
  },

  'percentage-calculator': {
    name: 'Percentage Calculator',
    seoTitle: 'Free Percentage Calculator Online',
    seoDescription: 'Calculate percentages changes, increases and decreases easily.',
    description: 'Calculate percentages quickly and easily with KumpiHub Percentage Calculator.',
    component: <PercentageCalculator />,
    howToUse: [
      'Enter the numbers you want to calculate.',
      'Choose the percentage calculation.',
      'Click Calculate.',
      'View your result.'
    ],
    faqs: [
      {
        question: 'Is the Percentage Calculator free?',
        answer: 'Yes. KumpiHub Percentage Calculator is free to use.'
      }
    ]
  },
  'invoice-generator': {
    name: 'Invoice Generator',
    seoTitle: 'Free Invoice Generator Online',
    seoDescription: 'Create professional invoices online for free with KumpiHub Invoice Generator.',
    description: 'Create professional invoices quickly and easily with KumpiHub Invoice Generator.',
    component: <InvoiceGenerator />,
    howToUse: [
      'Enter your business information.',
      'Enter your customer information.',
      'Add the products or services to the invoice.',
      'Review the invoice details.',
      'Generate and download your invoice.'
    ],
    faqs: [
      {
        question: 'Is the Invoice Generator free?',
        answer: 'Yes. KumpiHub Invoice Generator is free to use.'
      }
    ]
  },
  'pdf-editor': {
    name: 'PDF Editor',
    seoTitle: 'Free Online PDF Editor',
    seoDescription: 'Edit PDF files online for free with KumpiHub.',
    description: 'Add photos, text and signatures to your PDF documents online.',
    component: <PDFEditor />,
    howToUse: [
      'Upload your PDF file.',
      'Add photos, text or signatures.',
      'Move and resize added elements.',
      'Download your edited PDF.'
    ],
    faqs: [
      {
        question: 'Is the PDF Editor free?',
        answer: 'Yes. KumpiHub PDF Editor is free to use.'
      },
      {
        question: 'Can I edit a PDF on my phone?',
        answer: 'Yes. The PDF Editor works on supported mobile and desktop browsers.'
      }
    ]
  },
  'pdf-to-docx': {
  name: 'PDF to DOCX',
  slug: 'pdf-to-docx',
  seoTitle: 'PDF to DOCX Converter Online',
  seoDescription:
    'Convert PDF files to DOCX online for free with KumpiHub.',
  description:
    'Convert PDF files into editable DOCX documents quickly and easily.',
  component: <PDFToDOCX />,
  howToUse: [
    'Upload your PDF file.',
    'Click Convert to DOCX.',
    'Wait for the conversion to finish.',
    'Download your DOCX file.',
  ],
  faqs: [
    {
      question: 'Can I convert PDF to DOCX for free?',
      answer:
        'Yes. KumpiHub provides a free PDF to DOCX conversion tool.',
    },
    {
      question: 'Do I need to install software?',
      answer:
        'No. You can convert PDF files to DOCX directly in your browser.',
    },
    {
      question: 'Can I use PDF to DOCX on mobile?',
      answer:
        'Yes. The tool works on supported mobile and desktop browsers.',
    },
  ],
},

 
'jpg-to-pdf': {
  name: 'JPG to PDF',
  slug: 'jpg-to-pdf',
  seoTitle: 'JPG to PDF Converter Online',
  seoDescription:
    'Convert JPG images to PDF online for free with KumpiHub.',
  description:
    'Convert JPG images into PDF documents quickly and easily without installing software.',
  component: <JPGToPDF />,
  howToUse: [
    'Upload your JPG image.',
    'Preview your image.',
    'Convert the JPG image to PDF.',
    'Download your PDF file.',
  ],
  faqs: [
    {
      question: 'Can I convert JPG to PDF for free?',
      answer:
        'Yes. KumpiHub provides a free JPG to PDF conversion tool.',
    },
    {
      question: 'Do I need to install software?',
      answer:
        'No. You can convert JPG images to PDF directly in your browser.',
    },
    {
      question: 'Can I use the JPG to PDF tool on mobile?',
      answer:
        'Yes. It is designed to work on both mobile and desktop browsers.',
    },
  ],
},
'base64-tool': {
  name: 'Base64 Tool',
  slug: 'base64-tool',
  seoTitle: 'Free Base64 Encoder and Decoder Online',
  seoDescription:
    'Encode and decode text using Base64 online for free with KumpiHub.',
  description:
    'Encode text to Base64 or decode Base64 back to text quickly and easily.',
  component: <Base64Tool />,
  howToUse: [
    'Choose Encode or Decode.',
    'Enter or paste your text.',
    'Click the Encode or Decode button.',
    'Copy your result.'
  ],
  faqs: [
    {
      question: 'Is the Base64 Tool free?',
      answer:
        'Yes. KumpiHub Base64 Tool is free to use.'
    },
    {
      question: 'Can I use the Base64 Tool on mobile?',
      answer:
        'Yes. The tool works on supported mobile and desktop browsers.'
    },
    {
      question: 'Can I encode and decode Base64?',
      answer:
        'Yes. You can both encode text to Base64 and decode Base64 to text.'
    }
  ]
},
'meta-tag-tool': {
  name: 'Meta Tag Tool',
  slug: 'meta-tag-tool',
  seoTitle: 'Free Meta Tag Tool Online',
  seoDescription:
    'Generate SEO meta tags for your website quickly and easily with KumpiHub.',
  description:
    'Create title, description, keywords, author, canonical, and robots meta tags for your website.',
  component: <MetaTagTool />,
  howToUse: [
    'Enter your website information.',
    'Choose your preferred robots setting.',
    'Click the Generate Meta Tags button.',
    'Copy the generated HTML meta tags.'
  ],
  faqs: [
    {
      question: 'What is a meta tag?',
      answer:
        'A meta tag provides information about a webpage to search engines and browsers.'
    },
    {
      question: 'Is the Meta Tag Tool free?',
      answer:
        'Yes. KumpiHub Meta Tag Tool is free to use.'
    },
    {
      question: 'Can I use the generated tags on my website?',
      answer:
        'Yes. You can copy the generated tags and place them inside the head section of your HTML page.'
    }
  ]
},
'logo-generator': {
  name: 'Logo Generator',
  slug: 'logo-generator',
  seoTitle: 'Free Logo Generator Online',
  seoDescription:
    'Create simple logo designs online for free with KumpiHub Logo Generator.',
  description:
    'Create multiple logo variations using your brand name, style, icon and color, then download your favorite logo as a PNG image.',
  component: <LogoGenerator />,
  howToUse: [
    'Enter your brand name.',
    'Choose a logo style, icon and color.',
    'Click Generate Logos.',
    'Choose your favorite logo variation.',
    'Download your logo as a PNG image.'
  ],
  faqs: [
    {
      question: 'Is the Logo Generator free?',
      answer:
        'Yes. KumpiHub Logo Generator is free to use.'
    },
    {
      question: 'Do I need an AI account?',
      answer:
        'No. The Logo Generator works directly in your browser and does not require an AI account.'
    },
    {
      question: 'Can I download my logo?',
      answer:
        'Yes. You can download your selected logo as a PNG image.'
    }
  ]
},
'text-diff': {
  name: 'Text Diff',
  slug: 'text-diff',
  seoTitle: 'Free Text Diff Tool Online',
  seoDescription:
    'Compare two texts and find differences online for free with KumpiHub.',
  description:
    'Compare two versions of text and quickly identify added and removed content.',
  component: <TextDiff />,
  howToUse: [
    'Paste the original text.',
    'Paste the new text.',
    'Click Compare.',
    'Review the highlighted differences.',
    'Copy the comparison result if needed.'
  ],
  faqs: [
    {
      question: 'Is the Text Diff tool free?',
      answer:
        'Yes. KumpiHub Text Diff is free to use.'
    },
    {
      question: 'Can I compare text on mobile?',
      answer:
        'Yes. The Text Diff tool works on supported mobile and desktop browsers.'
    },
    {
      question: 'Do I need to upload my text?',
      answer:
        'No. Text comparison is performed directly in your browser.'
    }
  ]
},
'uuid-generator': {
  name: 'UUID Generator',
  slug: 'uuid-generator',
  seoTitle: 'Free UUID Generator Online',
  seoDescription:
    'Generate UUIDs online for free with KumpiHub.',
  description:
    'Generate unique UUID v4 identifiers instantly in your browser.',
  component: <UUIDGenerator />,
  howToUse: [
    'Choose how many UUIDs you want to generate.',
    'Click Generate UUID.',
    'Copy an individual UUID or copy all UUIDs.',
    'Use the generated UUIDs in your projects or applications.'
  ],
  faqs: [
    {
      question: 'What is a UUID?',
      answer:
        'A UUID is a unique identifier commonly used to identify data, records, users, files, and other objects.'
    },
    {
      question: 'Is the UUID Generator free?',
      answer:
        'Yes. KumpiHub UUID Generator is free to use.'
    },
    {
      question: 'Does the UUID Generator need a server?',
      answer:
        'No. UUIDs are generated directly in your browser.'
    }
  ]
},
'hash-generator': {
  name: 'Hash Generator',
  slug: 'hash-generator',
  seoTitle: 'Free Hash Generator Online',
  seoDescription:
    'Generate SHA-256, SHA-384, and SHA-512 hashes online for free with KumpiHub.',
  description:
    'Generate cryptographic hashes directly in your browser using SHA-256, SHA-384, and SHA-512.',
  component: <HashGenerator />,
  howToUse: [
    'Enter or paste your text.',
    'Choose a hash algorithm.',
    'Click Generate Hash.',
    'Copy the generated hash.'
  ],
  faqs: [
    {
      question: 'What is a hash?',
      answer:
        'A hash is a fixed-length value generated from data using a hash function. It is commonly used for data integrity and identification.'
    },
    {
      question: 'Which hash algorithms are supported?',
      answer:
        'KumpiHub Hash Generator currently supports SHA-256, SHA-384, and SHA-512.'
    },
    {
      question: 'Is the Hash Generator free?',
      answer:
        'Yes. KumpiHub Hash Generator is free to use.'
    },
    {
      question: 'Does the Hash Generator need a server?',
      answer:
        'No. Hashes are generated directly in your browser.'
    }
  ]
},
'favicon-generator': {
  name: 'Favicon Generator',
  slug: 'favicon-generator',
  seoTitle: 'Free Favicon Generator Online',
  seoDescription:
    'Create favicon icons from PNG, JPG and WebP images online for free with KumpiHub.',
  description:
    'Create favicon images in multiple sizes from your logo or image directly in your browser.',
  component: <FaviconGenerator />,
  howToUse: [
    'Upload a PNG, JPG or WebP image.',
    'Preview your image.',
    'Choose the favicon size you need.',
    'Download your favicon as a PNG file.'
  ],
  faqs: [
    {
      question: 'Is the Favicon Generator free?',
      answer:
        'Yes. KumpiHub Favicon Generator is free to use.'
    },
    {
      question: 'Do I need to upload my image to a server?',
      answer:
        'No. The favicon is generated directly in your browser.'
    },
    {
      question: 'Which favicon sizes are supported?',
      answer:
        'You can generate 16×16, 32×32, 48×48, 180×180, 192×192 and 512×512 PNG icons.'
    }
  ]
},
'svg-optimizer': {
  name: 'SVG Optimizer',
  slug: 'svg-optimizer',
  seoTitle: 'Free SVG Optimizer Online',
  seoDescription:
    'Optimize SVG files online and reduce file size for faster websites with KumpiHub.',
  description:
    'Optimize SVG files directly in your browser, reduce unnecessary code and download a smaller SVG file.',
  component: <SVGOptimizer />,
  howToUse: [
    'Upload an SVG file.',
    'Let KumpiHub optimize the SVG code.',
    'Review the original and optimized file sizes.',
    'Download your optimized SVG file.'
  ],
  faqs: [
    {
      question: 'Is the SVG Optimizer free?',
      answer:
        'Yes. KumpiHub SVG Optimizer is free to use.'
    },
    {
      question: 'Are my SVG files uploaded to a server?',
      answer:
        'No. The SVG optimization is performed directly in your browser.'
    },
    {
      question: 'Will the SVG image remain the same?',
      answer:
        'The optimizer removes unnecessary code and whitespace while keeping the SVG structure and visual content.'
    }
  ]
},
'image-to-svg': {
  name: 'Image to SVG',
  slug: 'image-to-svg',

  seoTitle: 'Free Image to SVG Converter Online',

  seoDescription:
    'Convert PNG, JPG, JPEG and WebP images to SVG online for free with KumpiHub.',

  description:
    'Convert PNG, JPG, JPEG and WebP images to SVG directly in your browser.',

  component: <ImageToSVG />,

  howToUse: [
    'Upload a PNG, JPG, JPEG or WebP image.',
    'The image is automatically converted to SVG.',
    'Preview the converted SVG image.',
    'Download your SVG file.'
  ],

  faqs: [
    {
      question: 'Is the Image to SVG converter free?',
      answer:
        'Yes. KumpiHub Image to SVG is free to use.'
    },

    {
      question: 'Which image formats are supported?',
      answer:
        'PNG, JPG, JPEG and WebP images are supported.'
    },

    {
      question: 'Are my images uploaded to a server?',
      answer:
        'No. The conversion is performed directly in your browser.'
    }
  ]
},
'css-formatter': {
  name: 'CSS Formatter',
  slug: 'css-formatter',

  seoTitle: 'Free CSS Formatter Online',

  seoDescription:
    'Format, beautify and minify CSS code online for free with KumpiHub.',

  description:
    'Format, beautify and minify CSS code quickly and easily directly in your browser.',

  component: <CSSFormatter />,

  howToUse: [
    'Paste your CSS code into the input box.',
    'Click Format CSS to beautify your code.',
    'Use Minify CSS to reduce the CSS file size.',
    'Copy your formatted or minified CSS.'
  ],

  faqs: [
    {
      question: 'Is the CSS Formatter free?',
      answer:
        'Yes. KumpiHub CSS Formatter is free to use.'
    },

    {
      question: 'Can I format CSS on mobile?',
      answer:
        'Yes. The CSS Formatter works on supported mobile and desktop browsers.'
    },

    {
      question: 'Does the CSS Formatter need a server?',
      answer:
        'No. CSS formatting and minifying are performed directly in your browser.'
    }
  ]
},
"html-formatter": {
  name: "HTML Formatter",
  slug: "html-formatter",

  seoTitle: "Free HTML Formatter Online",

  seoDescription:
    "Format, beautify and minify HTML code online for free with KumpiHub.",

  description:
    "Format, beautify and minify HTML code quickly and easily directly in your browser.",

  component: <HTMLFormatter />,

  howToUse: [
    "Paste your HTML code into the input box.",
    "Click Format HTML to beautify your code.",
    "Use Minify HTML to reduce the HTML size.",
    "Copy your formatted or minified HTML.",
  ],

  faqs: [
    {
      question: "Is the HTML Formatter free?",
      answer: "Yes. KumpiHub HTML Formatter is free to use.",
    },
    {
      question: "Can I format HTML on mobile?",
      answer:
        "Yes. The HTML Formatter works on supported mobile and desktop browsers.",
    },
    {
      question: "Does the HTML Formatter need a server?",
      answer:
        "No. HTML formatting and minifying are performed directly in your browser.",
    },
  ],
},
}
export default toolsData