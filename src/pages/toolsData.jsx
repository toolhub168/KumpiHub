import VideoDownloader from '../tools/VideoDownloader'
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
// import PDFEditor from '../tools/PDFEditor'
// import PDFToDOCX from '../tools/PDFToDOCX'
// import JPGToPDF from '../tools/JPGToPDF'

const toolsData = {

  'video-downloader': {
    name: 'Video Downloader',
    seoTitle: 'Free Video Downloader Online',
    seoDescription: 'Download videos online quickly and easily with KumpiHub Video Downloader.',
    description: 'KumpiHub Video Downloader helps you download supported online videos quickly and easily.',
    component: <VideoDownloader />,
    howToUse: [
      'Paste the video URL.',
      'Click the Download button.',
      'Choose the available download option.',
      'Save the video to your device.'
    ],
    faqs: [
      {
        question: 'Is KumpiHub Video Downloader free?',
        answer: 'Yes. KumpiHub Video Downloader is free to use.'
      },
      {
        question: 'Can I use it on my phone?',
        answer: 'Yes. The tool works on both mobile devices and computers.'
      }
    ]
  },

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
    seoDescription: 'Calculate percentages, percentage changes, increases and decreases easily.',
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
}
export default toolsData