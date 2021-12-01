import React, { ReactElement, useEffect, useState } from 'react'
import AssetList from '../../organisms/AssetList'
import Button from '../../atoms/Button'
import { generateBaseQuery, queryMetadata } from '../../../utils/aquarius'
import Permission from '../../organisms/Permission'
import { DDO, Logger } from '@oceanprotocol/lib'
import { useUserPreferences } from '../../../providers/UserPreferences'
import styles from './index.module.css'
import { useIsMounted } from '../../../hooks/useIsMounted'
import { useCancelToken } from '../../../hooks/useCancelToken'
import { SearchQuery } from '../../../models/aquarius/SearchQuery'
import { SortOptions, SortTermOptions } from '../../../models/SortAndFilters'
import { BaseQueryParams } from '../../../models/aquarius/BaseQueryParams'
import { PagedAssets } from '../../../models/PagedAssets'
import Header from './Header'
import Topic, { TTopic } from './Topic'
import { graphql, useStaticQuery } from 'gatsby'
import LottieVisualizer from '../../atoms/LottieVisualizer'
import CentralizedCTD from '../../../images/animations/CentralizedCTD'
import CentralizedPrivacy from '../../../images/animations/CentralizedPrivacy'
import DecentralizedCTD from '../../../images/animations/DecentralizedCTD'
import DecentralizedPrivacy from '../../../images/animations/DecentralizedPrivacy'
import Img from 'gatsby-image'

const topicQuery = graphql`
  query TopicQuery {
    file(relativePath: { eq: "pages/home/topics.json" }) {
      childHomeJson {
        topics {
          svg
          title
          content
        }
      }
    }
    about: file(relativePath: { eq: "animations/about.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

function sortElements(items: DDO[], sorted: string[]) {
  items.sort(function (a, b) {
    return (
      sorted.indexOf(a.dataToken.toLowerCase()) -
      sorted.indexOf(b.dataToken.toLowerCase())
    )
  })
  return items
}

function SectionQueryResult({
  title,
  query,
  action,
  queryData
}: {
  title: ReactElement | string
  query: SearchQuery
  action?: ReactElement
  queryData?: string[]
}) {
  const { chainIds } = useUserPreferences()
  const [result, setResult] = useState<any>()
  const [loading, setLoading] = useState<boolean>()
  const isMounted = useIsMounted()
  const newCancelToken = useCancelToken()
  useEffect(() => {
    async function init() {
      if (chainIds.length === 0) {
        const result: PagedAssets = {
          results: [],
          page: 0,
          totalPages: 0,
          totalResults: 0
        }
        setResult(result)
        setLoading(false)
      } else {
        try {
          setLoading(true)
          const result = await queryMetadata(query, newCancelToken())
          if (!isMounted()) return
          if (queryData && result?.totalResults > 0) {
            const sortedAssets = sortElements(result.results, queryData)
            const overflow = sortedAssets.length - 9
            sortedAssets.splice(sortedAssets.length - overflow, overflow)
            result.results = sortedAssets
          }
          setResult(result)
          setLoading(false)
        } catch (error) {
          Logger.error(error.message)
        }
      }
    }
    init()
  }, [chainIds.length, isMounted, newCancelToken, query, queryData])

  return (
    <section className={styles.section}>
      <h3>{title}</h3>
      <AssetList
        assets={result?.results}
        showPagination={false}
        isLoading={loading}
      />
      {action && action}
    </section>
  )
}

export default function HomePage(): ReactElement {
  const [queryLatest, setQueryLatest] = useState<SearchQuery>()
  const { chainIds } = useUserPreferences()

  const data = useStaticQuery(topicQuery)
  const { topics } = data.file.childHomeJson

  const topicSvgMap = {
    compute_to_data: (
      <>
        <LottieVisualizer source={DecentralizedCTD} />
        <LottieVisualizer source={CentralizedCTD} />
      </>
    ),
    privacy: (
      <>
        <LottieVisualizer source={DecentralizedPrivacy} />
        <LottieVisualizer source={CentralizedPrivacy} />
      </>
    ),
    about: (
      <Img
        fluid={data.about.childImageSharp.fluid}
        alt="decentralized about section"
      />
    )
  }

  useEffect(() => {
    const baseParams = {
      chainIds: chainIds,
      esPaginationOptions: { size: 3 },
      sortOptions: {
        sortBy: SortTermOptions.Created
      } as SortOptions
    } as BaseQueryParams

    setQueryLatest(generateBaseQuery(baseParams))
  }, [chainIds])

  return (
    <>
      <Header />
      {(topics as TTopic[]).map((topic, i) => (
        <Topic
          key={topic.title}
          svgComponent={topicSvgMap[topic.svg]}
          topic={topic}
          mirror={i % 2 === 1}
          index={i + 1}
        />
      ))}
      <Permission eventType="browse">
        <>
          {queryLatest && (
            <SectionQueryResult
              title="browse our data services"
              query={queryLatest}
              action={
                <Button style="text" to="/search?sort=created&sortOrder=desc">
                  All data sets and algorithms →
                </Button>
              }
            />
          )}
        </>
      </Permission>
    </>
  )
}
