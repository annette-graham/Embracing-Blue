import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import EditResourcesPages from './EditResourcesPages'

import { apiGetResourcesPage, apiEditResourcesPage } from '../../actions/pages'



class Prevention extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editPageTarget: null,
            resourcePage: props.resourcePage[0]
        }
    }

    componentDidMount() {
        this.props.dispatch(apiGetResourcesPage({ id: 3 }))
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({ resourcePage: newProps.resourcePage[0] })
    }

    toggleEdit(resourcePage) {
        if (this.state.editPageTarget == resourcePage) resourcePage = null
        this.setState({ editPageTarget: resourcePage })
    }



    render() {
        let { auth } = this.props
        let resourcePage = this.state.resourcePage

        const showEdit = this.state.editPageTarget == resourcePage
        const canEdit = auth.user ? auth.user.is_admin == true : false

        return (

            <div className="section">


                <div className="section">
                    {showEdit
                        ? <EditResourcesPages newPage={resourcePage} submit={() => this.toggleEdit(null)} />
                        : <div>
                            <figure className="image">
                                <img src={resourcePage && resourcePage.image1} />
                            </figure>

                            <h1 className="is-size-3">{resourcePage && resourcePage.header}</h1>
                            <p id='paras' className='is-size-4'>
                                {resourcePage && resourcePage.blurb}</p>
                        </div>
                    }

                    <div className='field is-grouped'>

                        {canEdit == true && <button className='button has-background-info is-centered has-text-light' onClick={() => this.toggleEdit(resourcePage)}>{showEdit ? 'Cancel Edit' : 'Edit Page'}</button>}
                    </div>
                </div>
                <Link to='/'><button className='back button has-background-info is-centered has-text-light'>Back</button></Link>

            </div>

        )
    }
}

const mapStateToProps = ({ auth, resourcePage }) => ({ auth, resourcePage })


export default connect(mapStateToProps)(Prevention)
