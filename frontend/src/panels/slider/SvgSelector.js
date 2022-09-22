interface Props {
  id: string;
}

export const SvgSelector = ({ id }: Props) => {
  switch (id) {
    case 'home':
      return (<svg width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_642_2074)">
            <path d="M16.6663 31.6667V22.1667H23.333V31.6667H31.6663V19H36.6663L19.9997 4.75L3.33301 19H8.33301V31.6667H16.6663Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_642_2074">
            <rect width="40" height="38" fill="white"/>
            </clipPath>
            </defs>
            </svg>);
    case 'guide':
      return (<svg width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.8622 0H4.82891C1.5196 0 -0.0565711 1.58333 0.00151086 3.16667V34.8333C-0.0558517 37.4722 2.9899 38 4.82891 38H35.8622C39.1724 38 40 35.8889 40 34.8333V3.16667C39.9426 0.527778 36.7817 0 35.8622 0ZM4.82891 3.69444H17.2411V19L11.0344 15.8333L4.82891 19V3.69444ZM17.9307 30.0833L12.4137 24.8056L4.82891 32.1944H35.1715L25.5167 22.6944L17.9307 30.0833Z" fill="white"/>
            </svg>);
    case 'poster':
      return (<svg width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.1111 17.1H8.88889V20.9H31.1111V17.1ZM35.5556 3.8H33.3333V0H28.8889V3.8H11.1111V0H6.66667V3.8H4.44444C1.98889 3.8 0.0222222 5.5005 0.0222222 7.6L0 34.2C0 36.2995 1.98889 38 4.44444 38H35.5556C38.0111 38 40 36.2995 40 34.2V7.6C40 5.5005 38.0111 3.8 35.5556 3.8ZM35.5556 34.2H4.44444V13.3H35.5556V34.2ZM24.4444 24.7H8.88889V28.5H24.4444V24.7Z" fill="white"/>
            </svg>);
    case 'ideas':
      return (<svg width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.0003 24.0669C22.9458 24.0669 25.3337 21.7985 25.3337 19.0003C25.3337 16.202 22.9458 13.9336 20.0003 13.9336C17.0548 13.9336 14.667 16.202 14.667 19.0003C14.667 21.7985 17.0548 24.0669 20.0003 24.0669Z" fill="white"/>
            <path d="M14.9997 3.16797L11.9497 6.33464H6.66634C4.83301 6.33464 3.33301 7.75964 3.33301 9.5013V28.5013C3.33301 30.243 4.83301 31.668 6.66634 31.668H33.333C35.1663 31.668 36.6663 30.243 36.6663 28.5013V9.5013C36.6663 7.75964 35.1663 6.33464 33.333 6.33464H28.0497L24.9997 3.16797H14.9997ZM19.9997 26.918C15.3997 26.918 11.6663 23.3713 11.6663 19.0013C11.6663 14.6313 15.3997 11.0846 19.9997 11.0846C24.5997 11.0846 28.333 14.6313 28.333 19.0013C28.333 23.3713 24.5997 26.918 19.9997 26.918Z" fill="white"/>
            </svg>);
    case 'random':
      return (<svg width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.6663 16.6263L23.6163 3.54797C22.4497 3.31047 21.2497 3.16797 19.9997 3.16797C15.9997 3.16797 12.333 4.5138 9.46634 6.73047L15.5663 16.7846L15.6663 16.6263ZM35.8997 14.2513C34.3663 9.62797 30.6497 5.92297 25.8997 4.21297L19.7997 14.2513H35.8997ZM36.333 15.8346H23.8497L24.333 16.6263L32.2663 29.6888C34.9997 26.8705 36.6663 23.1338 36.6663 19.0013C36.6663 17.9088 36.5497 16.8638 36.333 15.8346ZM14.233 19.0013L7.73301 8.3138C5.01634 11.1321 3.33301 14.8688 3.33301 19.0013C3.33301 20.0938 3.44967 21.1388 3.66634 22.168H16.1497L14.233 19.0013ZM4.09967 23.7513C5.63301 28.3746 9.34968 32.0796 14.0997 33.7896L20.1997 23.7513H4.09967ZM22.883 23.7513L16.383 34.4546C17.5497 34.6921 18.7497 34.8346 19.9997 34.8346C23.9997 34.8346 27.6663 33.4888 30.533 31.2721L24.433 21.218L22.883 23.7513Z" fill="white"/>
            </svg>);
    case 'menu':
      return(<svg width="40" height="38" viewBox="0 0 40 38" fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92"><path d="M78 23.5H14c-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5h64c3.6 0 6.5 2.9 6.5 6.5s-2.9 6.5-6.5 6.5zM84.5 46c0-3.6-2.9-6.5-6.5-6.5H14c-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5h64c3.6 0 6.5-2.9 6.5-6.5zm0 29c0-3.6-2.9-6.5-6.5-6.5H14c-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5h64c3.6 0 6.5-2.9 6.5-6.5z"/></svg>);
    default:
      return <svg></svg>;
  }
};