import React from 'react';
import { useForm } from 'react-hook-form';
import { AddDataSource as AddDataSourceInterface } from '../../interfaces/dataSourceInterface';
import { useAddDataSourceMutation } from '../../hooks/useDataSet';

type AddDataSourceProps = {
  setComponent: React.Dispatch<React.SetStateAction<string>>;
};

const AddDataSource: React.FC<AddDataSourceProps> = ({ setComponent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddDataSourceInterface>({
    defaultValues: {
      table_name: '',
      source_name: '',
    },
  });

  const resetState = () => {
    reset();
    setComponent('uploadFile');
  }
  const { mutate: addDataSource, status } = useAddDataSourceMutation(resetState);

  const onSubmit = handleSubmit(async (data) => {
    addDataSource(data);
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mb-6">
        <label htmlFor="sourceName" className="block text-sm font-medium text-gray-700 mb-2">
          Source Name
        </label>
        <input
          {...register('table_name', {
            required: 'Source name is required',
            minLength: {
              value: 3,
              message: 'Source name must be at least 3 characters',
            },
          })}
          type="text"
          id="table_name"
          className={`w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
            ${errors.table_name ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter source name"
        />
        {errors.table_name && (
          <p className="mt-1 text-sm text-red-500">{errors.table_name.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="source_name" className="block text-sm font-medium text-gray-700 mb-2">
          Database URL
        </label>
        <input
          {...register('source_name', {
            required: 'Database URL is required',
            pattern: {
              value: /^(postgres|mysql|sqlite|mariadb|):\/\/.*$/,
              message: 'Only postgres, mysql, sqlite & mariadb supported. Update the url validation if you are using extension like mysql+pymysql:',
            },
          })}
          type="text"
          id="source_name"
          className={`w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
            ${errors.source_name ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter your database url"
        />
        {errors.source_name && (
          <p className="mt-1 text-sm text-red-500">{errors.source_name.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'pending'}
        className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-6
          ${status === 'pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {status === 'pending' ? 'Adding Database...' : 'Add Database'}
      </button>

      <button
        type="button"
        onClick={() => setComponent('uploadFile')}
        className="font-medium text-blue-600 hover:text-blue-500 text-center w-full"
      >
        Upload Data Source
      </button>
    </form>
  );
};

export default AddDataSource;
