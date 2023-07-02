import React, { useEffect } from 'react';
import DataTable from '../../components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import PageHeading from '../../components/PageHeading';
import { Flex } from '@chakra-ui/react';
import {
  fetchAllVehicles,
  vehicleListStatus,
} from '../../features/vehicle/vehicleSlice';
import { fetchVehicles } from '../../api/vehicles';

const Vehicles = () => {
  const dispatch = useDispatch();

  const vehiclesList = useSelector(fetchAllVehicles);
  console.log(`🚀 ~ Vehicles ~ typeof vehiclesList:`, typeof vehiclesList);
  const vehiclesListStatus = useSelector(vehicleListStatus);

  const rowData = vehiclesList.map(({ _id, plateNumber }) => ({
    'Vehicle Id': _id,
    'Plate Number': plateNumber,
    'Blacklist Status': 'Not Blacklist',
  }));

  const columnDefs = [
    { field: 'Vehicle Id' },
    { field: 'Plate Number', filter: true },
    { field: ' Blacklist Status' },
  ];

  useEffect(() => {
    // fetch Vehicles only if vehiclesListStatus is 'idle'
    vehiclesListStatus === 'idle' && dispatch(fetchVehicles());
  }, [dispatch, vehiclesListStatus]);

  return (
    <>
      <PageHeading
        title={'Vehicles Information'}
        subTitle={'View all Vehicles information in one place'}
      />
      <Flex mx={'auto'} justify={'center'}>
        <DataTable rowData={rowData} columnDefs={columnDefs} />;
      </Flex>
    </>
  );
};

export default Vehicles;
