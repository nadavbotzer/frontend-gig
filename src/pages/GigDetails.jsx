import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { NavigationsAndActions } from '../cmps/Details/NavigationsAndActions'
import { GigContentLayout } from '../cmps/Details/GigContentLayout'
import { GigInfo } from '../cmps/Details/GigInfo'
import { BuyingInfo } from '../cmps/Details/BuyingInfo'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadGig, addGigMsg } from '../store/actions/gig.actions'

import '../assets/styles/cmps/GigDetails.scss'

export function GigDetails() {

  // const { gigId } = useParams()
  // const gig = useSelector(storeState => storeState.gigModule.gig)

  // useEffect(() => {
  //   loadGig(gigId)
  // }, [gigId])

  const gig = {
    _id: 'g101',
    title: 'I will design your logo',
    price: 249.90,
    owner: {
      _id: 'u101',
      fullname: 'Dudu Da',
      imgUrl: '',
      level: 'basic/premium',
      rate: 4,
    },
    daysToMake: 3,
    description: [
      "If you're on the lookout for stunningly realistic renderings that truly capture the essence of a space, you've landed in the perfect spot!",
      "Partnering with me means having a creative force that can transform an ordinary looking space into a masterpiece. Be it your bathroom, living area, kitchen or bedroom, I can create interior design that truly depict your taste and personality.",
      "Or if you're trying to stage a house for a potential sale or want to impress an investor and make your interior design pitch hit that sweet spot, I'm your guy!",
      "I'll create stunning photorealistic interior renders for you that will not only highlight the beauty of your space but will also serve as a great starting point for your project!",
      "Shoot me a message and let's discuss your project today!"
    ],
    avgResponseTime: 1,
    loc: 'Ghana',
    imgUrls: ['/img/img1.jpg'],
    tags: ['Arts And Crafts', 'Logo Design'],
    likedByUsers: ['mini-user'],
    reviews: [
      {
        id: 'madeId',
        txt: 'Did an amazing work',
        rate: 4,
        by: {
          _id: 'u102',
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
    ],
  }

  async function onAddGigMsg(gigId) {
    try {
      await addGigMsg(gigId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Gig msg added`)
    } catch (err) {
      showErrorMsg('Cannot add gig msg')
    }
  }

  return (
    <section className="gig-page">
      <NavigationsAndActions gigCategory={'Interior design'} />
      <GigContentLayout>
        <GigInfo gig={gig} />
        <BuyingInfo gig={gig} />
      </GigContentLayout>
    </section>
  )
}