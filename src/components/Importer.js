import React, { Component } from 'react'

import Button from 'react-bootstrap/Button';

import FlatfileImporter from "flatfile-csv-importer";

import createChild from "./CreateChild"

const LICENSE_KEY = `${process.env.FLATFILE_KEY}`

class Importer extends Component {
  constructor() {
    super()

    this.launch = this.launch.bind(this)
    this.importer = new FlatfileImporter(
      LICENSE_KEY,
      {
        fields: [
          {
             key: "beneficiary_id",
          },
          {
             key: "name",
          },
          {
             key: "age",
          },
          {
             key: "date_of_birth",
          },
          {
             key: "gender",
          },
          {
             key: "country",
          },
          {
             key: "language_spoken",
          },
          {
             key: "no_of_siblings",
          },
          {
             key: "marital_status_of_parents",
          },
          {
             key: "in_a_highly_vulnerable_area",
          },
          {
             key: "grade",
          },
          {
             key: "favorite_subjects_in_school",
          },
          {
             key: "hobbies",
          },
          {
             key: "child_image",
          },

         ],
        type: "Child",
        allowInvalidSubmit: true,
        managed: true,
        allowCustom: true,
        disableManualInput: true
       }
     )

  }

  launch() {
      this.importer
        .requestDataFromUser()
        .then(results => {
          this.importer.displayLoader()
          // Tell us what you want to happen to this data
          console.log(results.validData)
          createChild(results.validData)
          setTimeout(() => { // simulation of handling results asynchronously
            this.importer.displaySuccess('Success!')
          }, 1500)

        })
        .catch(function(error) {
          console.info(error || "window close");
        });
      }

  render () {

    return (
      <Button onClick={this.launch}>
        Launch Importer
      </Button>
    )
  }
}

export default Importer
