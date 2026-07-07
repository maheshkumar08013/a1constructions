const uploadBase = import.meta.env.DEV ? 'http://localhost:3000/uploads/images' : '/uploads/images'

export const projectGalleryMap = {
  1: [
    'WhatsApp Image 2026-06-30 at 10.27.22.jpeg',
    'WhatsApp Image 2026-06-30 at 10.28.16.jpeg',
    'WhatsApp Image 2026-06-30 at 10.28.17.jpeg',
  ],
  2: [
    'WhatsApp Image 2026-06-30 at 10.28.18.jpeg',
    'WhatsApp Image 2026-06-30 at 10.28.19.jpeg',
    'WhatsApp Image 2026-06-30 at 10.28.20.jpeg',
  ],
  3: [
    'WhatsApp Image 2026-06-30 at 10.28.21.jpeg',
    'WhatsApp Image 2026-06-30 at 10.28.25.jpeg',
    'WhatsApp Image 2026-06-30 at 10.28.26.jpeg',
  ],
  4: [
    'WhatsApp Image 2026-06-30 at 10.29.46.jpeg',
    'WhatsApp Image 2026-06-30 at 10.31.23.jpeg',
    'WhatsApp Image 2026-06-30 at 10.31.26.jpeg',
  ],
  5: [
    'WhatsApp Image 2026-06-30 at 10.33.20.jpeg',
    'WhatsApp Image 2026-06-30 at 10.33.26.jpeg',
    'WhatsApp Image 2026-06-30 at 10.33.49.jpeg',
  ],
  6: [
    'WhatsApp Image 2026-06-30 at 10.33.52.jpeg',
    'WhatsApp Image 2026-06-30 at 10.35.28.jpeg',
    'WhatsApp Image 2026-06-30 at 10.35.29.jpeg',
  ],
  7: [
    'WhatsApp Image 2026-06-30 at 10.35.30.jpeg',
    'WhatsApp Image 2026-06-30 at 10.35.31.jpeg',
    'WhatsApp Image 2026-06-30 at 10.37.17.jpeg',
  ],
  8: [
    'WhatsApp Image 2026-06-30 at 10.37.18.jpeg',
    'WhatsApp Image 2026-06-30 at 10.38.11.jpeg',
    'WhatsApp Image 2026-06-30 at 10.37.18 (1).jpeg',
  ],
  9: [
    'WhatsApp Image 2026-06-30 at 10.38.11 (1).jpeg',
    'WhatsApp Image 2026-06-30 at 10.35.30 (1).jpeg',
    'WhatsApp Image 2026-06-30 at 10.29.46 (1).jpeg',
  ],
}

export const defaultProjects = [
  { id:1, name:'Assam Bhawan', category:'Government', location:'Bengaluru, Karnataka', desc:'State guest house and diplomatic facility with premium government-grade finishing and modern amenities.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.27.22.jpeg`, year:'2022' },
  { id:2, name:'BBMP Multi Speciality Hospital', category:'Healthcare', location:'Bengaluru, Karnataka', desc:'Large-scale multi-speciality hospital serving thousands of Bangalore citizens daily with state-of-the-art facilities.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.28.18.jpeg`, year:'2023' },
  { id:3, name:'Dr Puneeth Rajkumar Hospital', category:'Healthcare', location:'Karnataka', desc:'Dedicated healthcare facility built in honour of Kannada icon Dr Puneeth Rajkumar, serving rural communities.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.28.21.jpeg`, year:'2023' },
  { id:4, name:'Yeshwanthpur Railway Station', category:'Railway', location:'Bengaluru, Karnataka', desc:'Infrastructure development for South Western Railway — platform works, station buildings, and civic amenities.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.29.46.jpeg`, year:'2021' },
  { id:5, name:'Government Degree College', category:'Education', location:'Karnataka', desc:'Complete college complex including classrooms, laboratory blocks, library, and student amenity facilities.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.33.20.jpeg`, year:'2020' },
  { id:6, name:'BGS Ground', category:'Urban Development', location:'Bengaluru, Karnataka', desc:'Sports and civic ground development for urban recreation, community events, and public utility.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.33.52.jpeg`, year:'2022' },
  { id:7, name:'BBMP Ward Office Complex', category:'Government', location:'Bengaluru, Karnataka', desc:'Administrative office complex with public service areas, meeting rooms, and civic infrastructure.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.35.30.jpeg`, year:'2021' },
  { id:8, name:'Karnataka Housing Board Flats', category:'Government', location:'Bengaluru, Karnataka', desc:'Affordable housing complex for Karnataka Housing Board — multi-storey residential blocks with all amenities.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.37.18.jpeg`, year:'2020' },
  { id:9, name:'Bangalore University Building', category:'Education', location:'Karnataka', desc:'Academic block construction for Bangalore University with modern lecture halls and research facilities.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.38.11 (1).jpeg`, year:'2019' },
]
