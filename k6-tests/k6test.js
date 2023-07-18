import http from 'k6/http';
import { sleep } from 'k6';
import { Counter, Trend, Rate } from 'k6/metrics';

// Define custom metrics
let customRPS = new Counter('custom_rps');
let customLatency = new Trend('custom_latency');
let customErrorRate = new Rate('custom_error_rate');

function getRandomProductId() {
  const minId = 1;
  const maxId = 1000000;
  return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
}

var id = getRandomProductId();

export const options = {
  stages: [
    { duration: '30s', target: 1 },  // Warm-up stage with 1 user
    { duration: '1m', target: 10 }, // 10 users for 1 minute
    { duration: '1m', target: 100 }, // 100 users for 1 minute
    { duration: '1m', target: 1000 }, // 1000 users for 1 minute
    { duration: '30s', target: 0 }, // Ramp down to 0 users
  ],
};

function getProducts() {
  const url = `http://localhost:3001/products`;
  const response = http.get(url);

  sleep(1);

  // Record custom metrics for each API call
  customRPS.add(1);
  customLatency.add(response.timings.duration);
  customErrorRate.add(response.status !== 200);
}

function getProductById(id) {
  const url = `http://localhost:3001/products/${id}`;
  const response = http.get(url);
  sleep(1);

  customRPS.add(1);
  customLatency.add(response.timings.duration);
  customErrorRate.add(response.status !== 200);
}

function getProductStyles(id) {
  const url = `http://localhost:3001/products/${id}/styles`;
  const response = http.get(url);

  sleep(1);

  customRPS.add(1);
  customLatency.add(response.timings.duration);
  customErrorRate.add(response.status !== 200);
}

function getRelatedProducts(id) {
  const url = `http://localhost:3001/products/${id}/related`
  const response = http.get(url);

  sleep(1);

  customRPS.add(1);
  customLatency.add(response.timings.duration);
  customErrorRate.add(response.status !== 200);
}

export default function () {
  // Run the stress test for each API endpoint
  getProducts();
  getProductById(id);
  getProductStyles(id);
  getRelatedProducts(id);
}