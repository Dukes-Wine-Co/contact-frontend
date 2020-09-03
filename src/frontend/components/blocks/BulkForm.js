import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import FormSubmissionButton from '../static/FormSubmissionButton';
import { csvToObj } from '../../../helpers/csv-to-obj';

const bulkSubmissionDataTypes = [
    'Address',
    'Event',
    'Person'
];

class BulkForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submissionType: 'Text',
            bulkValue: '',
            submissionDataType: null,
            file: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadCSV = this.uploadCSV.bind(this);
    }

    uploadCSV(e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                bulkValue: reader.result
            });
        };
        reader.readAsText(file);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log('change', this.state);
    }

    handleSubmit(event) {
        console.log('submit', this.state);
        event.preventDefault();
    }

    render() {
        const submissionOptions = bulkSubmissionDataTypes.map(type => {
            return <option value={type} key={type} >{type}</option>;
        });

        const submissionTypes = ['File', 'Text'].map((type, ind) => {
            return <Form.Check
                type="radio"
                key={type}
                label={type}
                name="submissionType"
                id={'formHorizontalRadios-'+ind}
                onChange={this.handleChange}
                value={type}
            />;
        });

        const textAreaElement = <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Bulk Submission Area</Form.Label>
            <Form.Control as="textarea" rows="8" value={this.state.bulkValue} name="bulkValue"
                          onChange={this.handleChange}/>
        </Form.Group>;

        const fileInputElement = <Form.Group>
            <Form.File id="exampleFormControlFile1" label="File input (supported file types: .csv)" name="bulkValue" onChange={this.uploadCSV}/>
        </Form.Group>;

        const submissionToRender = this.state.submissionType ?
            this.state.submissionType === 'Text' ? textAreaElement : fileInputElement :
            null;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="exampleForm.ControlSelect1" onChange={this.handleChange}>
                    <Form.Label>Submission Data Type</Form.Label>
                    <Form.Control as="select" name="submissionDataType">
                        {submissionOptions}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Submission Type</Form.Label>
                    <Col>{submissionTypes}</Col>
                </Form.Group>

                {submissionToRender}

                <FormSubmissionButton/>
            </Form>
        );
    }
}

export default hot(module)(BulkForm);