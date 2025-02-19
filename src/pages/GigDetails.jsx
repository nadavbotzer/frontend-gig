import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { GigInfo } from '../cmps/Details/GigInfo'
import { BuyingInfo } from '../cmps/Details/BuyingInfo'
import { GigContentLayout } from '../cmps/Details/GigContentLayout'
import { NavigationsAndActions } from '../cmps/NavigationsAndActions'
import { TagsHeader } from '../cmps/TagsHeader'

import { showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig/gig.service.local'

import '../assets/styles/pages/GigDetails.scss'

export function GigDetails() {

  const { gigId } = useParams()
  const [gig, setGig] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    gigId && loadGig(gigId)
  }, [gigId])

  useEffect(() => {
    gig && setIsLoading(false)
  }, [gig])

  async function loadGig(gigId) {
    setIsLoading(true);
    try {
      const gig = await gigService.getById(gigId)
      setGig(gig)
    } catch (err) {
      console.log("err: ", err);
      showErrorMsg('Could not find gig in server')
    }
  }

  if (isLoading || !gig) return <div>Loading...</div>;

  return (
    <section className="gig-page">
      <TagsHeader />
      <NavigationsAndActions
        gigCategory={'Interior design'}
        showActions={true}
      />
      <GigContentLayout>
        <GigInfo gig={gig} />
        <BuyingInfo gig={gig} />
      </GigContentLayout>
    </section>
  )
}