import unittest
from inject import Container

class TestContainer(unittest.TestCase):
    def setUp(self):
        self.container = Container()

    def test_dependency_registration(self):
        self.container.register('service', lambda: 'ServiceInstance')
        self.assertEqual(self.container.resolve('service'), 'ServiceInstance')

    def test_dependency_resolution(self):
        self.container.register('service', lambda: 'ServiceInstance')
        self.assertEqual(self.container.resolve('service'), 'ServiceInstance')

if __name__ == '__main__':
    unittest.main()

