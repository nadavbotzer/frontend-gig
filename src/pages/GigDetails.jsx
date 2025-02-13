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
    price: 12.16,
    owner: {
      _id: 'u101',
      fullname: 'Dudu Da',
      imgUrl: '',
      level: 'basic/premium',
      rate: 4,
    },
    daysToMake: 3,
    description: 'Make unique logo...',
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
      <GigContentLayout>
        <NavigationsAndActions gigCategory={'Interior design'} />
        <GigInfo gig={gig} />
        <BuyingInfo />
      </GigContentLayout>
    </section>
  )
}