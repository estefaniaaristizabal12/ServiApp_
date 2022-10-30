const myCards = [
  {
    id: 1,
    name: 'Master Card',
    icon: require('../../assets/mastercardI.png'),
    card_no: '1234'
  },
  {
    id: 2,
    name: 'Visa',
    icon: require('../../assets/visaI.png'),
    card_no: '1234'
  }
]

const allCards = [
  {
    id: 1,
    name: 'Master Card',
    icon: require('../../assets/mastercardI.png')
  },
  {
    id: 2,
    name: 'Visa',
    icon: require('../../assets/visaI.png')
  },
  {
    id: 3,
    name: 'Discover',
    icon: require('../../assets/discover.png')
  },
  {
    id: 4,
    name: 'American Express',
    icon: require('../../assets/american.jpg')
  }
]

const fromLocs = [
  {
    latitude: 1.5347282806345879,
    longitude: 110.35632207358996
  },
  {
    latitude: 1.556306570595712,
    longitude: 110.35504616746915
  },
  {
    latitude: 1.5238753474714375,
    longitude: 110.34261833833622
  },
  {
    latitude: 1.5578068150528928,
    longitude: 110.35482523764315
  },
  {
    latitude: 1.558050496260768,
    longitude: 110.34743759630511
  },
  {
    latitude: 1.5573478487252896,
    longitude: 110.35568783282145
  }
]

export default {
  myCards,
  allCards,
  fromLocs
}
