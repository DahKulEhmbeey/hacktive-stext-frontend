import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faSpinner, faBan } from '@fortawesome/free-solid-svg-icons';
import { ResponsiveLine } from '@nivo/line';

const apiUrl = 'http://a045c35e.ngrok.io';

const MyResponsiveLine = ({ data, handleTransactionFetch }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', stacked: true, min: 0, max: 1.0 }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Date information',
      legendOffset: 36,
      legendPosition: 'middle'
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Flag density',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    colors={{ scheme: 'nivo' }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="y"
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
    onClick={handleTransactionFetch}
  />
);

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drawbarVisible: false,
      drawbarData: null,
      loadingTransactionDetails: false,
      data: []
    }
  }

  componentDidMount() {
    fetch(`${apiUrl}/flag_history`, {
      method: "POST",
      body: JSON.stringify({bvn: 1}),
      headers: {
        'Content-Type': 'application/json'
      },
      // mode: "no-cors"
    })
      .then(res => res.json())
      .then(res => {
        const a = []
        res.flag.map((x, index) => {
          a.push({'x': res.time[index], 'y': x})
        });
        console.log(a);
        this.setState(() => ({
          data: a
        }))
      })
  }

  handleTransactionFetch = (point, event) => {
    console.log('Point:', point);
    const dat = data[0].data.filter(item => {
      return !!((item.x === point.data.x) && (item.y === point.data.y));
    });
    if (dat) {
      this.setState(() => ({
        drawbarVisible: true,
        drawbarData: dat
      }));
    }
  }

  toggleDrawbarVisibility = () => {
    this.setState(({drawbarVisible}) => ({
      drawbarVisible: !drawbarVisible
    }));
  }

  render() {
    const { drawbarVisible, drawbarData, loadingTransactionDetails } = this.state;
    return (
      <React.Fragment>
        <div className="main-header">
          <span>Dashboard</span>
          <input
            type="search"
            placeholder="Search by BVN..."
          />
        </div>
        <div className="dashboard-body">
          <MyResponsiveLine data={data} handleTransactionFetch={this.handleTransactionFetch} />
        </div>
        <div className={`dashboard-aside ${drawbarVisible ? 'active' : ''}`}>
          <div>
            <div className="drawbar-opener" onClick={this.toggleDrawbarVisibility}>
              <FontAwesomeIcon icon={drawbarVisible ? faChevronRight : faChevronLeft} />
            </div>
            {!loadingTransactionDetails
              ? (
                drawbarData
                  ? (
                    <div className="drawbar-content">
                      <h4>Transaction Details</h4>
                      <p><em>BVN:</em>{drawbarData.bvn}</p>
                      <p><em>Transaction Type:</em>{drawbarData.transactionType}</p>
                      <p><em>Transaction Channel:</em>{drawbarData.transactionChannel}</p>
                    </div>
                  ) : (
                    <div className="d-flex">
                      <FontAwesomeIcon icon={faBan} />
                      <p>Click on one point on the chart to load details.</p>
                    </div>
                  )
              ) : (
                <div className="d-flex">
                  <FontAwesomeIcon icon={faSpinner} spin />
                  <p>Loading transaction details...</p>
                </div>
              )}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard

const data = [
  {
    "id": "_1",
    "color": "hsl(245, 70%, 50%)",
    "data": [
      {
        "x": "Sun 9th",
        "y": 0.3
      },
      {
        "x": "Mon 10th",
        "y": 0.8
      },
      {
        "x": "Tue 11th",
        "y": 0.2
      },
      {
        "x": "Wed 12th",
        "y": 0.3
      },
      {
        "x": "Thu 13th",
        "y": 0.0
      },
      {
        "x": "Fri 14th",
        "y": 0.4
      },
      {
        "x": "Sat 15th",
        "y": 0.4
      },
      {
        "x": "Sun 16th",
        "y": 0.3
      },
      {
        "x": "Mon 17th",
        "y": 0.8
      },
      {
        "x": "Tue 18th",
        "y": 0.2
      },
      {
        "x": "Wed 19th",
        "y": 0.3
      },
      {
        "x": "Thu 20th",
        "y": 0.0
      },
      {
        "x": "Fri 21th",
        "y": 0.4
      },
      {
        "x": "Sat 22th",
        "y": 0.4
      }
    ]
  }
];
