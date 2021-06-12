import React from "react";

import { calculateTax, calculateDiscount } from "../Calculations";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const { useState } = React;

function BooksFetcher() {
  const [bookInfos, setBookInfos] = useState([]);
  const [badRequest, setBadRequest] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchBooks() {
    setBadRequest(false);
    setLoading(true);
    try {
      const response = await fetch("/books");
      const data = await response.json();
      console.log(data);
      setBookInfos(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setBadRequest(true);
      setBookInfos([]);
      setLoading(false);
    }
  }

  const printBookInfo = (bookInfo, id) => {
    let tax = calculateTax(bookInfo.Cost);
    let discount =
      bookInfo.BookCategory === "Crime"
        ? calculateDiscount(bookInfo.Cost - tax)
        : 0;

    return (
      <TableRow key={id}>
        <TableCell>{bookInfo.Title}</TableCell>
        <TableCell align="right">{bookInfo.BookCategory}</TableCell>
        <TableCell align="right">{"$" + bookInfo.Cost}</TableCell>
        <TableCell align="right">{"$" + tax.toFixed(2)}</TableCell>
        <TableCell align="right" style={{ color: "red" }}>
          {"-$" + discount.toFixed(2)}
        </TableCell>
        <TableCell align="right">
          {(bookInfo.Cost + discount + tax).toFixed(2)}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div data-testid="Component-BookFetcher">
      <Typography variant="h5">
        Welcome to Perry Fardella's Book-API-Reader App
      </Typography>
      <Button
        data-testid="Button-Fetch"
        variant="contained"
        color="primary"
        onClick={() => {
          fetchBooks();
        }}
      >
        Fetch Book Data
      </Button>
      <br></br>
      <div style={{ display: loading ? "block" : "none" }}>
        <CircularProgress />
      </div>

      <div style={{ display: badRequest ? "block" : "none" }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Bad request received, try again.
        </Alert>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Book Name</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Category</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Cost</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Tax</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Discount</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Total Cost</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookInfos.map((bookInfo, id) => printBookInfo(bookInfo, id))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BooksFetcher;
