import { useState } from 'react'
import { useQuery } from 'react-query'
import { ClimbingBoxLoader } from 'react-spinners'
import { css } from '@emotion/react'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'

import { CharacterCard } from 'components'
import { getCharacters } from 'api'

const CharacterList = () => {
  const [page, setPage] = useState(1)
  const [loadingPage, setLoadingPage] = useState('next')
  const { data, isLoading, isError, isFetching } = useQuery(
    ['page', page],
    async () => getCharacters(page),
    {
      keepPreviousData: true,
      useInfiniteQuery: true,
    }
  )

  const handleChangePage = (e) => {
    if (e.target.dataset.page === 'prev' && page > 1) {
      setLoadingPage('prev')
      setPage((currentPage) => currentPage - 1)
    }
    if (e.target.dataset.page === 'next' && page < data.info.pages) {
      setLoadingPage('next')
      setPage((currentPage) => currentPage + 1)
    }
  }

  if (isLoading)
    return <ClimbingBoxLoader loading={isLoading} css={override} size={15} />

  if (isError)
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 48px)',
        }}
      >
        <ReportGmailerrorredIcon sx={{ fontSize: 150 }} />
        <Typography variant="h3" component="h3">
          Something went wrong...
        </Typography>
      </Box>
    )

  return (
    <Box sx={{ marginBottom: 5 }}>
      <Container
        maxWidth="md"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          alignItems: 'center',
          justifyItems: 'center',
          gap: 2,
          marginTop: 3,
        }}
      >
        {data.results &&
          data.results.map(({ id, image, species, gender, location, name }) => (
            <CharacterCard
              key={id}
              imgSrc={image}
              species={species}
              gender={gender}
              locationName={location.name}
              name={name}
            />
          ))}
      </Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <LoadingButton
          onClick={handleChangePage}
          startIcon={<ArrowBackIcon />}
          loading={loadingPage === 'prev' && isFetching}
          loadingPosition="start"
          variant="contained"
          data-page="prev"
          disabled={!!!data.info.prev}
          sx={{ marginRight: 3 }}
        >
          Previous page
        </LoadingButton>
        <LoadingButton
          onClick={handleChangePage}
          endIcon={<ArrowForwardIcon />}
          loading={loadingPage === 'next' && isFetching}
          loadingPosition="end"
          variant="contained"
          data-page="next"
          disabled={!!!data.info.next}
          sx={{ marginLeft: 3 }}
        >
          Next page
        </LoadingButton>
      </Box>
    </Box>
  )
}

const override = css`
  position: absolute;
  left: 0;
  right: 0;
  margin: calc(50vh - 150px) auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export { CharacterList }
