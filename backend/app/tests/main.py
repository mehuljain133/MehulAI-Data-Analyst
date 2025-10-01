import unittest
import os


def run_tests():
    # Discover and load all test files from the tests directory
    loader = unittest.TestLoader()

    # Ensure to provide the correct path to the tests directory
    suite = loader.discover(start_dir=os.path.dirname(
        __file__), pattern='test_*.py')

    # Run the test suite
    runner = unittest.TextTestRunner()
    runner.run(suite)


if __name__ == '__main__':
    run_tests()
