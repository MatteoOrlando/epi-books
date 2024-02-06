
import SingleBook from './SingleBook'
import { Col, Form, Row } from 'react-bootstrap'
import CommentArea from './CommentArea'
// ---------------------------------------
import { useState, useEffect } from 'react'



const BookList = ({ bookTitle }) => {
  // state = {
  //   searchQuery: '',
  //   selectedBook: null,
  // }
  const [selectedBook, setSelectedBook] = useState(null)
  const [searchQuery, setSearchQuery] = useState(true)

  useEffect(() => {
    fetchSelectedBook()
  }, [bookTitle])



  const fetchSelectedBook = () => {

    setSelectedBook(true)
    fetch('../data/fantasy.json' + bookTitle)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('libro non selezionato!')
        }

      })
      .then((data) => {
        setSearchQuery(data.Search[0])
      })
      .catch((error) => {

        console.log(error)
        setSelectedBook(false)
      })
  }


  return (
    <>
      <Row>
        <Col md={8}>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={4} className="text-center">
              <Form.Group>{searchQuery ? ()}
                <Form.Control
                  type="search"
                  placeholder="Cerca un libro"
                  value={searchQuery}
                  onChange={(e) =>
                    ({ searchQuery: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-2 mt-3">
            {
              .filter((b) =>
              b.title.toLowerCase().includes(searchQuery)
            )
                .map((b) => (
                  <Col xs={12} md={4} key={b.asin}>
                    <SingleBook
                      book={b}
                      selectedBook={selectedBook}
                      changeSelectedBook={changeSelectedBook}
                    />
                  </Col>
                ))}
          </Row>
        </Col>
        <Col md={4}>
          <CommentArea asin={selectedBook} />
        </Col>
      </Row>
    </>
  )
}


export default BookList
