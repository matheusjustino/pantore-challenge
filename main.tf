terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
    }
  }
}

# DIGITALOCEAN RESOURCES

variable "do_token" {
  type      = string
  default   = "" # digital ocean api token
  sensitive = true
}

variable "cluster_name" {
  type    = string
  default = "desafio-pantore-k8s"
}

variable "k8s_version" {
  type    = string
  default = "1.32.2-do.0"
}

variable "region" {
  type    = string
  default = "nyc1" # New York
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_kubernetes_cluster" "desafio-pantore-k8s" {
  name    = var.cluster_name
  region  = var.region
  version = var.k8s_version

  node_pool {
    name       = "worker-pool"
    size       = "s-1vcpu-2gb"
    auto_scale = false
    node_count = 1
  }
}
