import { First, Second, Third, Fourth, Fifth } from '@/icons/ApproachIcons';
import Service_1 from "../../public/service1.png";
import Service_2 from "../../public/service2.png";
import Service_3 from "../../public/service3.png";
import Service_4 from "../../public/service4.png";
import Service_5 from "../../public/service5.png";

export const NAV_ITEMS = [
  {
    title: 'Main',
    href: 'main',
  },
  {
    title: 'About',
    href: 'about',
  },
  {
    title: 'Services',
    href: 'services',
  },
  {
    title: 'Products',
    href: 'products',
  },
 
  {
    title: 'Contact',
    href: '/contact',
  },
];

export const CARDS = [
  {
    title: 'Design',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam alias placeat temporibus mollitia doloribus. Consequatur aperiam facilis culpa fuga quia! Labore, sequi! Optio officiis obcaecati tempora voluptates consequuntur, placeat ad.',
    services: [
      ['Web app', 'Branding'],
      ['Mobile app', 'Logo'],
    ],
    number: '01.',
    classes: '',
  },
  {
    title: 'Fullstack development',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam alias placeat temporibus mollitia doloribus. Consequatur aperiam facilis culpa fuga quia! Labore, sequi! Optio officiis obcaecati tempora voluptates consequuntur, placeat ad.',
    services: [
      ['Online shop', 'Web application'],
      ['CMS', 'API Development'],
    ],
    number: '02.',
    classes: 'border-t border-gray-1/50',
  },
  {
    title: 'Mobile development',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam alias placeat temporibus mollitia doloribus. Consequatur aperiam facilis culpa fuga quia! Labore, sequi! Optio officiis obcaecati tempora voluptates consequuntur, placeat ad.',
    services: [['Android', 'IOS']],
    number: '03.',
    classes: 'border-t border-gray-1/50',
  },
];
export const TESTIMONIAL_CARDS = [
  {
    name: 'Emily Carter',
    testimonial:
      'The design services were outstanding! The team created a stunning web app and branding that perfectly captured our vision. Highly professional and creative.',
    rating: 5,
    number: '01.',
    classes: '',
  },
  {
    name: 'Michael Brown',
    testimonial:
      'Their fullstack development team delivered a robust online shop and API integration. The project was completed on time and exceeded our expectations.',
    rating: 4,
    number: '02.',
    classes: 'border-t border-gray-1/50',
  },
  {
    name: 'Sarah Davis',
    testimonial:
      'The mobile app development for both Android and iOS was seamless. The attention to detail and user experience was exceptional. Would recommend!',
    rating: 5,
    number: '03.',
    classes: 'border-t border-gray-1/50',
  },
];

export const APPROACH_CARDS = [
  {
    icon: First,
    title: 'Consultation',
    description:
      "We listen carefully to the customer's wishes and ideas about the project. Then we share our vision and, based on this exchange, come to a common agreement.",
  },
  {
    icon: Second,
    title: 'Joint review',
    description:
      'Then we start creating the design. After completion, we conduct a joint review, where the customer, if desired, can make changes.',
  },
  {
    icon: Third,
    title: 'Development',
    description: 'After the design is approved, we proceed to the actual development of the product.',
  },
  {
    icon: Fourth,
    title: 'Testing',
    description:
      'Once the development is complete, we thoroughly test each component of the product. Then we invite the customer for user testing.',
  },
  {
    icon: Fifth,
    title: 'Final result',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates laboriosam ad eius, culpa soluta ab. Beatae optio quas adipisci aliquam quia velit soluta iste dicta, modi tenetur magnam, aut laborum placeat est. Unde minima amet illo eveniet qui sunt omnis laudantium laboriosam, officia dignissimos molestias tempore velit. Provident, explicabo. Dolor.',
  },
];

export const RADIO_FIELDS = [
  {
    title: 'What type of services you want?',
    classes: 'mr-[2.25vw]',
    radioArray: [
      { name: 'Design/Branding', value: 'design/branding' },
      { name: 'Web Development', value: 'web-dev' },
      { name: 'Mobile Development', value: 'mobile-dev' },
      { name: 'All of the above', value: 'all-types' },
      { name: 'Other', value: 'other-service' },
    ],
    formKey: '_service',
  },
  {
    title: 'What is your budget category?',
    classes: '',
    radioArray: [
      { name: '$2000 - $4000', value: '2-4' },
      { name: '$4000 - $8000', value: '4-8' },
      { name: '$8000 - $10000', value: '8-10' },
      { name: '$10000', value: '10+' },
    ],
    formKey: '_budget',
  },
  {
    title: 'Approximately how many pages will your project have?',
    classes: 'mr-[2.25vw]',
    radioArray: [
      { name: 'Less than 5', value: '<5' },
      { name: '6-10', value: '6-10' },
      { name: '11-20', value: '11-20' },
      { name: '20+', value: '20+' },
    ],
    formKey: '_pages',
  },
  {
    title: 'How quickly do you need the project?',
    classes: '',
    radioArray: [
      { name: 'As fast as possible', value: 'max-fast' },
      { name: 'High priority ', value: 'high-prio ' },
      { name: 'Regular time', value: 'regular' },
      { name: 'Take your time ', value: 'take-your-time' },
    ],
    formKey: '_quickness',
  },
];

export const INPUT_FIELDS = [
  { label: 'Your name', name: 'first', classes: 'inline-block !w-[calc(50%-2vw)] mr-[4vw]', required: true },
  { label: 'Phone', name: 'phone', classes: 'inline-block !w-[calc(50%-2vw)]', type: 'number', required: true },
  { label: 'Email', name: 'email', classes: '', type: 'email' },
  { label: 'Company name', name: 'company', classes: '', required: true },
  { label: 'Company website', name: 'websiteUrl', classes: '' },
];

export const BOOK_FORM_DEFAULT_STATE = {
  _service: null,
  _budget: null,
  _pages: null,
  _quickness: null,

  first: '',
  phone: '',
  email: '',
  company: '',
  websiteUrl: '',
  message: '',
};


export const services = [
  {
    id: "world-1",
    imgUrl: Service_1,
    title: "Social Media Management",
  },
  {
    id: "world-2",
    imgUrl: Service_2,
    title: "Performance Marketing",
  },
  {
    id: "world-3",
    imgUrl: Service_3,
    title: "Branding and Design",
  },
  {
    id: "world-4",
    imgUrl: Service_4,
    title: "Web Design and Development",
  },
  {
    id: "world-5",
    imgUrl: Service_5,
    title: "Celebrity and PR Management",
  },
];
