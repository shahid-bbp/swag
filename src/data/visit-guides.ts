export interface VisitGuide {
  title: string;
  description: string;
  steps: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
}
const guide = (title: string, description: string, steps: [string, string][], faqs: [string, string][]): VisitGuide => ({
  title, description, steps: steps.map(([title, text]) => ({ title, text })), faqs: faqs.map(([question, answer]) => ({ question, answer })),
});

export const visitGuides: Record<string, VisitGuide> = {
  'beauty-lounge': guide('Care That Starts With a Conversation', 'Choose your focus, then let the details of your visit take shape.', [
    ['Choose your focus', 'Explore facial care, grooming, waxing, manicures and pedicures. Start with the area you would most like to give attention.'],
    ['Share your routine', 'Tell the team about your usual products, preferences and any sensitivities before choosing a service.'],
    ['Plan the time', 'If you want to combine services, ask reception about the order and time needed when you enquire.'],
  ], [
    ['Can I combine beauty services?', 'Share the services you are considering when booking. The team can confirm which can be scheduled together and the time to allow.'],
    ['How do I choose between a clean-up and a facial?', 'Use the menu to compare options, then discuss your skin-care goals with the team before deciding.'],
    ['Can services be customised?', 'Yes. Your service choice, custom preferences, and any additions will be confirmed with your specialist before the appointment begins.'],
  ]),
  'facials': guide('Make room for your skin-care goals.', 'A little context helps make your facial consultation more useful.', [
    ['Describe your priorities', 'Tell the team whether you are looking for a simple clean-up, a relaxing facial or help choosing between the menu options.'],
    ['Bring your routine', 'A list of the products and treatments you currently use can help guide the conversation. Mention any sensitivities.'],
    ['Ask about the next steps', 'Before leaving, ask which aftercare guidance applies to the facial you selected.'],
  ], [
    ['Can I book without choosing a facial first?', 'Yes. Request a facial consultation and explain what you are looking for. Confirm the recommended treatment with the team before proceeding.'],
    ['What should I mention before my appointment?', 'Share your current skin-care routine, recent treatments and any known product sensitivities when you enquire.'],
  ]),
  'grooming': guide('Small details. A considered finish.', 'Plan your brow, threading or detan appointment around your preferences.', [
    ['Choose the areas', 'List the grooming services you would like so reception can plan your appointment.'],
    ['Discuss the shape', 'For brows, explain the shape and fullness you prefer before the service begins. A reference image can help.'],
    ['Confirm the finish', 'Review the planned services and ask about any aftercare relevant to your selection.'],
  ], [
    ['Can I keep my natural brow shape?', 'Explain that preference at the start of your appointment and discuss the amount of shaping you would like.'],
    ['Is threading booked separately from detan?', 'They appear separately on the menu. Mention both if you would like to enquire about a combined visit.'],
  ]),
  'waxing': guide('A waxing appointment, thoughtfully planned.', 'Clear preferences help the team prepare for your visit.', [
    ['Specify the areas', 'Choose the body or face areas from the menu and include them in your enquiry.'],
    ['Discuss your preferences', 'Ask about strip and stripless options for your chosen areas. Mention any sensitivities or recent skin treatments.'],
    ['Confirm preparation', 'Ask the team what preparation and aftercare they recommend for your appointment.'],
  ], [
    ['How do I choose strip or stripless waxing?', 'The menu lists the available options by area. The team can discuss those options with you before booking.'],
    ['Can I add another area on the day?', 'Ask reception first. Additional services depend on available appointment time and specialist schedule.'],
  ]),
  'manicure': guide('A little attention for hardworking hands.', 'From a quick tidy to a longer ritual, choose the visit that suits you.', [
    ['Compare the menu', 'Explore Express, Classic Spa, Advanced and Signature manicure options before enquiring.'],
    ['Choose your shape', 'Bring an idea of your preferred length, nail shape and finish to your appointment.'],
    ['Mention existing products', 'Let the team know if you currently wear gel or extensions so removal can be discussed.'],
  ], [
    ['Is nail art included in a manicure?', 'Nail artistry has a separate menu. Ask the team to confirm the inclusions and options for your chosen finish.'],
    ['Can I pair a manicure with a pedicure?', 'Mention both in your enquiry so reception can confirm a suitable appointment schedule.'],
  ]),
  'pedicure': guide('Give your feet a moment of care.', 'Make your pedicure preferences part of the booking conversation.', [
    ['Find your pace', 'Compare Express, Classic Spa, Advanced and Signature options according to your available time.'],
    ['Discuss your finish', 'Let the team know the nail length, shape and polish finish you have in mind.'],
    ['Plan your visit', 'Ask about timing, what to bring and any existing polish removal when you book.'],
  ], [
    ['Do you offer gel polish for toes?', 'Gel polish for toes is listed in the Nail Studio menu. Ask about adding it to your appointment when booking.'],
    ['What if I am unsure which pedicure to choose?', 'Explain the experience you would like and ask the team to compare the listed options with you.'],
  ]),
  'hair-artistry-spa': guide('A new chapter for your hair.', 'A clear brief makes room for a more personal consultation.', [
    ['Bring your inspiration', 'Save a few images of the colour, texture or finish you like. Include what you want to keep about your current look.'],
    ['Share your hair history', 'Discuss previous colour, texture services and your everyday styling routine with your stylist.'],
    ['Plan the upkeep', 'Ask about appointment length, treatment steps and the care your chosen service will need afterwards.'],
  ], [
    ['Can I enquire before deciding on a treatment?', 'Yes. Tell the team what you would like to change or maintain, and request a consultation to compare the menu options.'],
    ['Can treatments be tailored to my hair?', 'Hair length, density, texture and service complexity are assessed during consultation to create your customised hair plan.'],
    ['Can I combine colour and a texture service?', 'Ask your stylist to assess and advise on the sequence before scheduling. Do not assume both can be performed in the same visit.'],
  ]),
  'hair-treatment': guide('Start with the care your hair needs.', 'Use your consultation to discuss your routine and compare treatment options.', [
    ['Describe your routine', 'Share how you wash, dry and style your hair, and what you would like the appointment to focus on.'],
    ['Compare your options', 'Ask the stylist about the listed spa, oil massage and conditioning services before choosing.'],
    ['Take the guidance home', 'Ask for care instructions specific to your selected treatment and regular routine.'],
  ], [
    ['Are hair treatments available for men and women?', 'The menu lists treatment options for both men and women. Reception can help identify the relevant service when you enquire.'],
    ['How much time should I allow?', 'Timing depends on the selected service and your hair. Confirm the appointment duration with the salon when booking.'],
  ]),
  'hair-transformation': guide('Think beyond the first-day finish.', 'Discuss your desired texture alongside your everyday styling habits.', [
    ['Define your goal', 'Explain the finish you want and how much time you like to spend styling your hair.'],
    ['Review the options', 'Discuss previous colour and texture services before comparing the transformation menu with your stylist.'],
    ['Confirm your care plan', 'Ask about maintenance, aftercare, service duration and your personalised quote before proceeding.'],
  ], [
    ['Which texture treatment should I choose?', 'The right choice depends on your hair history and desired finish. Use a consultation to compare the available services.'],
    ['Are crown-only services available?', 'The menu includes crown options for selected services. Ask the stylist which option fits the area you want to address.'],
  ]),
  'hair-colouring': guide('Colour with your own point of view.', 'Build your colour brief around tone, placement and everyday upkeep.', [
    ['Save a colour reference', 'Choose a few images showing the tone and placement you like, rather than a single exact result.'],
    ['Share previous colour', 'Tell your stylist about earlier colouring, lightening and texture services before discussing your next look.'],
    ['Ask about preparation', 'Confirm any consultation or testing requirements, expected appointment time and maintenance before booking.'],
  ], [
    ['Can you recreate a reference colour exactly?', 'Reference images help communicate a direction. Your starting colour, hair history and the agreed service affect the finish.'],
    ['Do you offer both root colour and balayage?', 'Yes, root touch-up, global colour, ombré and hand-painted balayage are listed on the menu. Confirm suitability and consultation options with your colourist.'],
  ]),
  'nail-studio': guide('Your style, down to the smallest detail.', 'Plan the shape, length and finish before choosing your nail service.', [
    ['Choose your foundation', 'Compare polish, overlays and extensions according to the length and shape you have in mind.'],
    ['Find your finish', 'Save a colour palette or nail-art reference to show the artist. Decide whether you prefer a subtle or expressive look.'],
    ['Allow for the details', 'Mention existing products, removal and art additions so the team can confirm timing and treatment steps.'],
  ], [
    ['Can I bring nail-art inspiration?', 'Yes. Bring a reference and discuss which details can be adapted to your chosen shape, length and appointment time.'],
    ['Are nail-art add-ons included in extensions?', 'The menu lists base services and add-ons separately. Confirm your full design requirements before your appointment begins.'],
    ['Can I book removal or refills?', 'The menu includes gel polish removal and extension refills. Describe what you currently wear when enquiring.'],
  ]),
  'nail-services': guide('Build your look from the base up.', 'Choose the foundation before the finishing details.', [
    ['Choose length and shape', 'Think about a comfortable everyday length and the silhouette you prefer.'],
    ['Discuss the base', 'Compare gel polish, overlays and extension options with the artist using the menu as a starting point.'],
    ['Mention removal or refills', 'Tell reception about any existing polish or extensions so the appointment can be planned accurately.'],
  ], [
    ['What is the difference between polish and extensions?', 'Polish adds a colour finish; extensions add length. Ask the artist to explain the listed options before choosing your base service.'],
    ['Can I add a French finish?', 'French tips are listed on the menu. Confirm the finish and base service when booking.'],
  ]),
  'nail-addons': guide('Make the finishing details your own.', 'A considered palette brings a nail design together.', [
    ['Pick your palette', 'Bring colour ideas, an outfit reference or a saved design to guide the conversation.'],
    ['Choose an accent', 'Explore chrome, cat eye, ombré, glitter and hand-painted details in the artistry menu.'],
    ['Agree on the design', 'Confirm which nails will carry the detail and discuss the design requirements and time needed with your nail artist.'],
  ], [
    ['Can I choose art for only a few nails?', 'Discuss your preferred accent nails with the artist to customize your chosen set.'],
    ['Should I book a base service as well?', 'Tell reception whether you already have a suitable base or need polish, an overlay or extensions alongside the art.'],
  ]),
  'body-wellness-spa': guide('Create a little space in your day.', 'Choose a wellness appointment around your comfort and available time.', [
    ['Choose your focus', 'Explore full-body options or a shorter focus such as the back, feet or head.'],
    ['Share your preferences', 'Discuss pressure, comfort and any areas you would prefer the therapist to avoid before the session.'],
    ['Plan a calm arrival', 'Confirm your appointment time and ask reception what to expect on your first visit.'],
  ], [
    ['Can I choose a shorter focused session?', 'The menu includes back massage, foot reflexology and Indian head massage alongside full-body options. Confirm the duration when booking.'],
    ['Can I discuss pressure preferences?', 'Yes. Explain your preferences before the session and communicate with the therapist if you would like an adjustment.'],
    ['How do I confirm availability?', 'Send your preferred service and date through the enquiry form or contact reception directly. Your slot is confirmed by the team.'],
  ]),
  'body-massage': guide('A session shaped around your comfort.', 'Let your preferences guide the conversation before your appointment.', [
    ['Compare session types', 'Explore aroma, Swedish, deep tissue and focused massage options in the menu.'],
    ['Explain your preferences', 'Share your preferred pressure and any comfort considerations with the team before the session.'],
    ['Confirm the details', 'Check the duration for your selected service and ask about arrival instructions.'],
  ], [
    ['Can I change the pressure during a session?', 'Let the therapist know if you would like the pressure adjusted or would prefer to pause.'],
    ['What should I include in my booking enquiry?', 'Include your selected service, preferred date and time, and any preferences you would like to discuss before arriving.'],
  ]),
  'bridal': guide('Your bridal story, beautifully considered.', 'Bring the occasion, outfit and schedule into one conversation.', [
    ['Gather your inspiration', 'Save makeup and hair references alongside photographs of your outfits and jewellery.'],
    ['Map your celebrations', 'Share ceremony dates, locations and ready-by times so the team can discuss the services for each event.'],
    ['Confirm every detail', 'Ask about package inclusions, any trial arrangements, travel and accessories before confirming your booking.'],
  ], [
    ['When should I enquire about my bridal date?', 'Enquire once you know your event dates and location. Availability and any preparation schedule are confirmed during consultation.'],
    ['Can hair, makeup and draping be coordinated?', 'These services are available in the bridal menu. Discuss the combination and confirm what your chosen package includes.'],
    ['Are travel and accessories included?', 'Confirm these details with the team. Travel outside city limits is additional, and accessory arrangements should be agreed in advance.'],
  ]),
  'makeup-and-hair': guide('Let the whole look come together.', 'Your outfit and occasion provide a starting point for makeup and hair.', [
    ['Collect your references', 'Bring a small selection of makeup and hairstyle images, plus outfit and jewellery photographs.'],
    ['Describe the occasion', 'Share ceremony lighting, venue and ready-by time to help plan the appointment.'],
    ['Agree on the finish', 'Discuss the makeup option, hairstyle and any accessories before confirming the services.'],
  ], [
    ['How do I choose HD or airbrush makeup?', 'Both options appear on the menu. Discuss your preferred finish and event details with the artist before selecting a service.'],
    ['Can I book for an engagement or reception?', 'The menu includes engagement, reception and party makeup. Share your event details when enquiring.'],
  ]),
  'draping': guide('The final fold, thoughtfully placed.', 'A few practical details help your draping appointment run smoothly.', [
    ['Share the style', 'Tell the team whether you need regular, bridal or Kerala set saree draping, or veil and dupatta setting.'],
    ['Discuss what to bring', 'Ask which garments, footwear, accessories and fastening items you should bring with you.'],
    ['Plan the sequence', 'Confirm the order of hair, makeup and draping, along with the time you need to be ready.'],
  ], [
    ['Can I book only saree draping?', 'Standalone draping options are listed. Confirm your preferred style and appointment availability with the salon.'],
    ['Can accessories be set during the appointment?', 'Hair accessory and veil setting are listed as services. Mention the items and ask about the appropriate booking.'],
  ]),
  'packages': guide('Find the package that fits your celebrations.', 'Use the comparison above as a starting point for a personal bridal consultation.', [
    ['Compare the inclusions', 'Review Silver, Gold and Platinum alongside the services you actually want for your celebrations.'],
    ['Bring your calendar', 'Share event dates and available preparation days so the team can discuss a practical schedule.'],
    ['Request a complete quote', 'Confirm customisations, travel, accessories and applicable taxes before reserving your package.'],
  ], [
    ['Can a bridal package be customised?', 'Packages are customised after consultation and are subject to appointment availability. Discuss your priorities with the team.'],
    ['Does selecting a package reserve my date?', 'No. An enquiry starts the conversation. Your date and booking arrangements must be confirmed directly by the salon.'],
    ['Can I compare services before choosing a tier?', 'Yes. Use the package comparison and individual makeup, hair and draping menus to prepare your questions.'],
  ]),
};

export const homeQuestions = [
  { question: 'Where is S For Swag?', answer: 'Find us on the first floor of Narayan Center, Mahatma Gandhi Road, opposite Seematti in Kacheripady, Kochi.' },
  { question: 'Do I need to choose a service before enquiring?', answer: 'You can start with the experience you have in mind. Tell the team about your preferences and ask for help comparing the service menu.' },
  { question: 'Is an online enquiry a confirmed appointment?', answer: 'An enquiry is a request. The team will confirm your service, appointment time and availability directly.' },
  { question: 'Can I plan several services for one visit?', answer: 'Share your full list of services when enquiring so reception can discuss the order, timing and availability.' },
];
