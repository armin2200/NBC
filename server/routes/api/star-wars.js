const express = require('express');
const request = require('request');
const Rx = require('@reactivex/rxjs');

const router = express.Router();

const url = 'https://swapi.co/api/people';

router.get('/', (req, res) =>
  Rx.Observable.create(observer => {
    request(
      `${url}/?search=${req.query.search}`,
      {
        method: 'GET',
        json: true
      },
      (error, response, body) => {
        if (error) {
          observer.error(error);
        } else if (response.statusCode >= 500) {
          observer.error(response);
        } else if (response.statusCode === 404) {
          observer.next(null);
        } else if (response.statusCode >= 400 && response.statusCode < 500) {
          observer.next({
            statusCode: body.statusCode,
            code: body.code
          });
        } else {
          observer.next(body);
        }

        observer.complete();
      }
    );
  }).subscribe(
    response => {
      // console.log(response.results);
      return res.send(response.results);
    },
    err => {
      return res.status(500).send(err.message);
    }
  )
);

module.exports = router;
