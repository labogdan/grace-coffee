import React, { Component } from 'react'
import { Link } from "gatsby"

import FlatfileImporter from "flatfile-csv-importer";

const LICENSE_KEY = "5b779f83-e8e9-4b25-8316-bbbcfc33bb1e"

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
          // Tell us what you want to happen to this data
          console.log(results.validData)
        })
        .catch(function(error) {
          console.info(error || "window close");
        });
      }

  render () {

    return (
      <>
        <div>hello</div>
        <input
            type="button"
            id="launch"
            value="Launch Importer"
            onClick={this.launch}
            />

      </>
    )
  }
}

export default Importer
