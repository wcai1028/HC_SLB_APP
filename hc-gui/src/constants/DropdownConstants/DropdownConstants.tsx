export class DropdownConstants {
    TRIGGERS = {
        objectType: [{
            key: 'partition',
            label: 'Partition',
            value: 'partition',
            default: true
        }, {
            key: 'type',
            label: 'Type',
            value: 'type'
        }],
        windowType: [{
            key: 'length',
            label: 'over last N samples',
            value: 'length',
            default: true
        }, {
            key: 'lengthBatch',
            label: 'over intervals N samples',
            value: 'lengthBatch'
        }, {
            key: 'time',
            label: 'over last T mins',
            value: 'time'
        }, {
            key: 'timeBatch',
            label: 'over every T mins intervals',
            value: 'timeBatch'
        }, {
            key: 'timeLength',
            label: 'N samples max during last T mins',
            value: 'timeLength'
        }],
        metricAgg: [{
            key: 'avg',
            label: 'Avg',
            value: 'avg',
            default: true
        }, {
            key: 'sum',
            label: 'Sum',
            value: 'sum'
        }, {
            key: 'max',
            label: 'Max',
            value: 'max'
        }, {
            key: 'min',
            label: 'Min',
            value: 'min'
        }, {
            key: 'count',
            label: 'Count',
            value: 'count'
        }, {
            key: 'distinctCount',
            label: 'Distinct Count',
            value: 'distinctCount'
        }],
        windowTimeParam: [{
            key: 'min',
            label: 'Min',
            value: 'min',
            default: true
        }, {
            key: 'sec',
            label: 'Sec',
            value: 'sec'
        }],
        params: [],
        operation: [{
            key: 'sum',
            label: 'Sum',
            value: 'sum',
            default: true
        }, {
            key: 'max',
            label: 'Max',
            value: 'max'
        }],
        operator: [{
            key: 'gt',
            label: 'Greater than',
            value: 'gt',
            default: true
        },
        {
            key: 'lt',
            label: 'Less than',
            value: 'lt'
        },
        {
            key: 'eq',
            label: 'Equals',
            value: 'eq'
        },
        {
            key: 'gteq',
            label: 'Greater than or equals',
            value: 'gteq'
        },
        {
            key: 'lteq',
            label: 'Less than or equals',
            value: 'lteq'
        }],
        condition: [{
            key: 'and',
            label: 'AND',
            value: 'and',
            default: true
        },
        {
            key: 'or',
            label: 'OR',
            value: 'or'
        }]
    }
    ALERTS = {
        objectType: [{
            key: 'partition',
            label: 'Partition',
            value: 'partition',
            default: true
        }, {
            key: 'type',
            label: 'Type',
            value: 'type'
        }],
        metricAgg: [{
            key: 'average',
            label: 'AVG',
            value: 'average',
            default: true
        }, {
            key: 'sum',
            label: 'SUM',
            value: 'sum'
        }],
        metric: [{
            key: 'controlCPU',
            label: 'Control CPU',
            value: 'controlCPU',
            default: true
        }, {
            key: 'dataCPU',
            label: 'Data CPU',
            value: 'dataCPU'
        }],
        condition: [{
            key: 'greaterThan',
            label: 'Greater than',
            value: 'greaterThan',
            default: true
        },
        {
            key: 'lessThan',
            label: 'Less than',
            value: 'lessThan'
        }],
        priority: [{
            key: 'critical',
            label: 'Critical',
            value: 'critical',
            type: 'stopped',
            default: true
        }, {
            key: 'moderate',
            label: 'Moderate',
            value: 'moderate',
            type: 'warning'
        }, {
            key: 'low',
            label: 'Low',
            value: 'low',
            type: 'lowwarn'
        }, {
            key: 'info',
            label: 'Informational',
            value: 'info',
            type: 'info'
        }, {
            key: 'healthy',
            label: 'Healthy',
            value: 'healthy',
            type: 'ongoing'
        }],
        existingTriggers: [],
        existingActions: [],
        tags: []
    }
    ACTIONS = {
        users: []
    }
    APPS = {
        namespace: [{
            key: 'cgn',
            label: 'CGN',
            value: 'cgn',
            default: true
        }, {
            key: 'ssli',
            label: 'SSLI',
            value: 'ssli'
        }, {
            key: 'gifw',
            label: 'GIFW',
            value: 'gifw'
        }]
    }
    CLUSTERS = {
        zone: [{
            key: 'zone1',
            label: 'Zone 1',
            value: 'zone1',
            default: true
        }, {
            key: 'zone2',
            label: 'Zone 2',
            value: 'zone2'
        }],
        region: [{
            key: 'region1',
            label: 'Region 1',
            value: 'region1',
            default: true
        }, {
            key: 'region2',
            label: 'Region 2',
            value: 'region2'
        }],
        location: [{
            key: 'location1',
            label: 'Location 1',
            value: 'location1',
            default: true
        }, {
            key: 'location2',
            label: 'Location 2',
            value: 'location2'
        }]
    }
    LICENSE = {
        activationStatus: [{
            key: 'ACTIVATED',
            label: 'Activated',
            value: 'ACTIVATED',
            type: 'ongoing',
            default: true
        }, {
            key: 'IN_PROGRESS',
            label: 'In Progress',
            value: 'IN_PROGRESS',
            type: 'lowwarn',
        }, {
            key: 'PENDING',
            label: 'Pending',
            value: 'PENDING',
            type: 'warning',
        }, {
            key: 'FAILED',
            label: 'Failed to activate',
            value: 'FAILED',
            type: 'stopped',
        }]
    }
}

export default DropdownConstants;