import unittest
from unittest.mock import patch, MagicMock
from sqlalchemy.orm import sessionmaker
from sqlalchemy import inspect
from app.config.db_config import DB


class TestDB(unittest.TestCase):

    @patch('app.config.db_config.create_engine')
    def setUp(self, mock_create_engine):
        # Mock the database engine
        self.mock_engine = mock_create_engine.return_value
        self.mock_connection = self.mock_engine.connect.return_value.__enter__.return_value

        # Initialize the DB object with the mocked engine
        self.db = DB("sqlite:///./mehul.db")

    @patch('app.config.db_config.inspect')
    def test_get_schemas(self, mock_inspect):
        # Define mock table names
        mock_table_names = ['users']

        # Define mock inspector and column data
        mock_inspector = mock_inspect.return_value
        mock_inspector.get_columns.side_effect = [
            [{'name': 'id', 'type': 'INTEGER', 'nullable': False},
             {'name': 'name', 'type': 'VARCHAR', 'nullable': False}],
        ]

        # Call the method
        schemas = self.db.get_schemas(mock_table_names)

        # Assert inspector was called correctly
        mock_inspect.assert_called_once_with(self.mock_engine)
        self.assertEqual(len(schemas), 1)

        # # Assert schema structure is correct
        self.assertEqual(schemas[0]['table_name'], 'users')
        self.assertEqual(schemas[0]['schema'][0]['name'], 'id')

    # @patch('app.config.db_config.create_engine')
    # def test_execute_query(self, mock_create_engine):
    #     # Mock the result of the query
    #     mock_result = MagicMock()
    #     mock_result.fetchall.return_value = [('row1',), ('row2',)]
    #     self.mock_connection.execute.return_value = mock_result

    #     # Execute query
    #     query = "SELECT * FROM users"
    #     result = self.db.execute_query(query, {})

    #     # Assert that the query was executed
    #     self.mock_connection.execute.assert_called_once_with(query, None)

    #     # Assert the result is as expected
    #     self.assertEqual(result, [('row1',), ('row2',)])

    # @patch('app.db.create_engine')
    # def test_create_session(self, mock_create_engine):
    #     # Create session
    #     session = self.db.create_session()

    #     # Assert the session is created using sessionmaker
    #     self.assertIsInstance(session, sessionmaker)

    # @patch('app.db.logger')
    # @patch('app.db.inspect')
    # def test_get_schemas_with_exception(self, mock_inspect, mock_logger):
    #     # Mock an exception in get_schemas
    #     mock_inspect.side_effect = Exception("Test Exception")

    #     # Call get_schemas and ensure it handles the exception
    #     result = self.db.get_schemas(['invalid_table'])

    #     # Assert the result is an empty list and logger called with error
    #     self.assertEqual(result, [])
    #     mock_logger.error.assert_called_once_with(
    #         "An error occurred: Test Exception")


if __name__ == '__main__':
    unittest.main()
