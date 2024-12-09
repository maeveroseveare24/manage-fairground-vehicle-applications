//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('/', (req, res) => {

    let applications = req.session.data.applications

    const filterStatus =req.query.filterStatus

    if (filterStatus && filterStatus !== "_unchecked") {

        applications = applications.filter((application) =>
        
            filterStatus.includes(application.status)

        )

    }
    applications.sort((a, b) => {
        const submittedAtA = a.submittedAt; // ignore upper and lowercase
        const submittedAtB = b.submittedAt; // ignore upper and lowercase
        if (submittedAtA < submittedAtB) {
          return -1;
        }
        if (submittedAtA > submittedAtB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
    res.render('index.html', {
        applications
    })
})

router.get('/applications/:id', (req, res) => {

    const id = req.params.id
    const applications = req.session.data.applications

    const application = applications.find((application) => application.id === id)

    res.render('application.html', {
        application
    })

})

router.post('/applications/:id/accept', (req, res) => {

    const id = req.params.id
    const applications = req.session.data.applications

    const application = applications.find((application) => application.id === id)

    application.status = "Approved"

    res.redirect('/applications/' + id)

})

router.post('/applications/:id/reject', (req, res) => {

    const id = req.params.id
    const applications = req.session.data.applications

    const application = applications.find((application) => application.id === id)

    application.status = "Rejected"

    res.redirect('/applications/' + id)

})
