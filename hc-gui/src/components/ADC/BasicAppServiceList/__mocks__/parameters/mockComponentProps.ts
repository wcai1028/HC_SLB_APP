
export default (isLoading: boolean = false) => {
  if (isLoading) {
    return {
      data: new Array,
      isLoading: true,
    }
  } else {
    return {
      data: [
        {
          'app-svc': 'appSvc1',
          vport: '80+tcp',
          'app-svc-group': 'appSvcGrp1',
        },
        {
          'app-svc': 'appSvc2',
          vport: '81+udp',
          'app-svc-group': 'appSvcGrp2',
        },
      ],
      isLoading: false,
    }
  }

}
